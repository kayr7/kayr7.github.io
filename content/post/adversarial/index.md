---
title: Adversarial Attacks on Neural Networks
subtitle: Playing jedi mind tricks with Deep neural networks
summary: This is part of a lecture I gave at KIT (Karlsruhe Institute of Technology) in the master course "neural networks". It is to show what adversarial attacks are and what they mean for machine learning based classification.
authors:
  - admin
tags: []
categories: []
date: '2020-07-16T00:00:00Z'
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
image:
  caption: 'Image credit: [**Gerd Altmann**](https://pixabay.com/de/illustrations/fraktal-bin%C3%A4r-eins-null-absturz-65474/)'
  focal_point: ''
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []

# Set captions for image gallery.
gallery_item:
  - album: gallery
    caption: Default
    image: theme-default.png
  - album: gallery
    caption: Ocean
    image: theme-ocean.png
  - album: gallery
    caption: Forest
    image: theme-forest.png
  - album: gallery
    caption: Dark
    image: theme-dark.png
  - album: gallery
    caption: Apogee
    image: theme-apogee.png
  - album: gallery
    caption: 1950s
    image: theme-1950s.png
  - album: gallery
    caption: Coffee theme with Playfair font
    image: theme-coffee-playfair.png
  - album: gallery
    caption: Strawberry
    image: theme-strawberry.png
---

> **Note (2020):** This post was written in July 2020 as part of a lecture at KIT. While the fundamental concepts of adversarial attacks remain relevant, the field has advanced significantly since then. Newer attack methods and defense mechanisms have been developed, and some of the PyTorch APIs used in the code examples (e.g., `Variable`, `zero_gradients`) have since been deprecated. The core idea — that neural networks can be fooled by small, targeted perturbations — still holds, but the state of the art in both attacks and defenses has moved well beyond what is shown here.

# Example for Adversarial attack

This notebook shows, how with relatively little code we can change the classification of a neural network without it being visible for humans.

```python
import torch
import torch.nn
from torch.autograd.gradcheck import zero_gradients
import torch.nn.functional as F
import torchvision.models as models
from PIL import Image
from torchvision import transforms
import numpy as np
import requests, io
import matplotlib.pyplot as plt
from torch.autograd import Variable
import json
from tqdm import tqdm
%matplotlib inline

torch.manual_seed(210) # for reproducibility

```

    <torch._C.Generator at 0x7f8d8a1d3bd0>

### Download and setup model for evaluation mode

also show the labels we can classify. The pretrained models can distinguish 1000 classes, we are loading two different models. One Resnet based and one different architecture VGG16.

```python
# use the labels for the imagenet data
labelsfile = "./labels.json"
data = ""
with open (labelsfile, "r") as myfile:
    data=myfile.read()
labels_json = json.loads(data)
labels = {int(idx):label for idx, label in labels_json.items()}


#mean and std will remain same irresptive of the model you use
mean=[0.485, 0.456, 0.406]
std=[0.229, 0.224, 0.225]

preprocess = transforms.Compose([
                transforms.Resize((224,224)),
                transforms.ToTensor(),
                transforms.Normalize(mean, std)
            ])

```

```python
# helper function to visualize an image tensor
def visualize(x):
    x = x.squeeze(0)     #remove batch dimension # B * C * H * W ==> C * H * W
    #reverse of normalization op- "unnormalize" - multiplication by std and adding of mean
    x = x.mul(torch.FloatTensor(std).view(3,1,1)).add(torch.FloatTensor(mean).view(3,1,1)).numpy()#reverse of normalization op- "unnormalize"
    # transpose to put channel last (like it is in regular rgb images)
    x = np.transpose( x , (1,2,0))   # C * H * W  ==>   H * W * C
    x = np.clip(x, 0, 1)

    figure = plt.imshow(x)
    plt.show()
```

### Let's load an image we want to change the classification for

With everything prepared, let's now get a real image to work on

```python
img = Image.open("stop.jpg")

image_tensor = preprocess(img) #preprocess an i
image_tensor = image_tensor.unsqueeze(0) # add batch dimension.  C X H X W ==> B X C X H X W
img_variable = Variable(image_tensor.clone(), requires_grad=True) #convert tensor into a variable

visualize(image_tensor)
```

![png](output_6_0.png)

### Classify the example

first of all, let's try the regular classification with the loaded neural network.

```python
def classifyImage(network, image):
    output = network.forward(image)
    label_idx = torch.max(output.data, 1)[1][0]   #get an index(class number) of a largest element
    x_pred = labels[int(label_idx)]
    output_probs = F.softmax(output, dim=1)
    x_pred_prob =  (torch.max(output_probs.data, 1)[0][0]) * 100
    return (x_pred, x_pred_prob)




resnet = models.resnet34(pretrained=True) #download and load pretrained model
resnet.eval() # setting network to eval mode, to make sure we don't modify it's weights

# let's also have another model for verification...
net2 = models.vgg16(pretrained=True)
net2.eval()


print(classifyImage(resnet, img_variable))
print(classifyImage(net2, img_variable))

```

    ('street sign', tensor(55.5840))
    ('street sign', tensor(40.9388))

The image is correctly classified as a street sign from both networks.
Good, now let's see what happens when we start changing the image.

### Adding noise to the image

First let's generate noise

```python
noise_image = 0.3 * torch.rand(img_variable.size())
visualize(noise_image)
```

![png](output_10_0.png)

### Now let's simply classify the noise alone

again let's use the loaded neural network model

```python
print(classifyImage(resnet, noise_image))
print(classifyImage(net2, noise_image))
```

    ('wall clock', tensor(4.5388))
    ('wall clock', tensor(2.4095))

Both networks consolidated on the same class, but on a very low value. The same class is probably just luck or some bias in the data, but let's see what happens now, when we combine the original image with the noise.

### Now let's add this noise to the image

```python
noisy_image = img_variable + noise_image
visualize(noisy_image.detach())
```

![png](output_14_0.png)

The new image looks not as clear as the original image, a bit grainy like camera noise, so let's now

### Test how the classification will work on this noisy image

```python
print(classifyImage(resnet, noisy_image))
print(classifyImage(net2, noisy_image))

```

    ('street sign', tensor(56.2734))
    ('street sign', tensor(31.2596))

**Image still classified as "street sign"**

even though there is visible distortion applied to the image, the image is still classified as a stop sign.
The model seems to be robust against distortion. Is that really the case?

### Idea: directed distortion

The problem with the approach above to fool the classificator is, that the noise is random and therefore kind of cancels itself out to some degree.

But we can do better, we can try to modify the noise in a certain direction

## Adversarial attack

If we iteratively move the _input_ slightly in a direction where the classification is closer to a different class, we can try to force the model to make a wrong decision.
For doing this we have all we need, since we know the model's internals. We can simply use gradients for this purpose.

So let's do the following: define a target class, compute the gradients with regard to the difference of the input image and the target (wrong) class, and then move slightly into the direction where the difference decreases.

This is a so called white box attack - since we know the parameters of the neural network.

Let's do this for 5 iterations in small steps.

```python
epsilon = 0.5
num_steps = 10
alpha = 0.02
```

```python
y_true = Variable( torch.LongTensor([808]), requires_grad=False)
loss = torch.nn.CrossEntropyLoss()                 # compute loss
orig_img = img_variable.data

for i in tqdm(range(num_steps)):
  zero_gradients(img_variable)                       # flush gradients for the img_variable
  output = resnet.forward(img_variable)              # perform forward pass on the known neural network
  loss_cal = loss(output, y_true)
  loss_cal.backward()
  x_grad = alpha * torch.sign(img_variable.grad.data)   # as per the formula
  adv_temp = img_variable.data - x_grad                 # add perturbation to img_variable which also contains perturbation from previous iterations
  total_grad = (adv_temp - orig_img)                  # total perturbation
  total_grad = torch.clamp(total_grad, -epsilon, epsilon)
  x_adv = orig_img + total_grad                      #add total perturbation to the original image
  img_variable.data = x_adv

```

    100%|██████████| 10/10 [00:02<00:00,  3.51it/s]

The new constructed image was only slightly changed in these iterations, so let's look at the generated image in comparison to the original:

```python
visualize (img_variable.detach())
visualize(image_tensor)
```

![png](output_22_0.png)

![png](output_22_1.png)

The images look pretty similar still, only small perturbations are visible for the human eye, so let's also look at the difference between original and modified image:

```python
visualize(img_variable.detach() - image_tensor)
```

![png](output_24_0.png)

So how does our classificator do now on this changed image?

```python
print(classifyImage(resnet, img_variable))
```

    ('sombrero', tensor(99.7362))

### Success

We were able to fool the classificator to see something else, while for a human the image looks almost the same.

### But

We knew the parameters of the network, is that a fair attack?

While it is certainly a good point against this kind of attack, often times it is indeed possible to get these parameters.
But even if we don't know the parameters, let's try, what another classificator would say, let's try a resnet50 classificator:

```python
resnet50 = models.resnet50(pretrained=True) #download and load pretrained model
resnet50.eval() # setting network to eval mode, to make sure we don't modify it's weights
print(classifyImage(resnet50, img_variable))

```

    ('plastic bag', tensor(47.2186))

So even the deeper model is still fooled, without us having seen the weights of this model.
But maybe this was because of the similar architectures?

So we can try the same again on an architecture which is different from Resnet:

```python
print(classifyImage(net2, img_variable)) # remember this is a vgg16 model!

```

    ('umbrella', tensor(22.4518))

## Success!

all different trained networks, predicting previously correct the class street sign had been fooled into different predictions.

## Conclusion

In this notebook we showed how comparably easy it is to fool a neural network in a classification task.
Obviously, the same approach can be used for other tasks, too.

It is also shown, that a whitebox attack might also be used as a surrogate for fooling other networks. Even networks, that are not very close from an architectural perspective.

```python

```
