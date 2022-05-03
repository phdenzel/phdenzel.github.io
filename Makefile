PREFIX ?= /srv/www/phdenzel

build:
	@jekyll build

deploy: build
	@sudo mkdir -p $(PREFIX)
	@sudo cp -rT _site $(PREFIX)
