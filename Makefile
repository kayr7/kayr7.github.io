all:
	HUGO_THEME=academia hugo --themesDir themes/ 
	cp -r public deploy/data/


clean:
	rm -rf public
