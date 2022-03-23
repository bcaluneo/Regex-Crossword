MAIN = server.js
OUTDIR = dist
SRCDIR = src

run:
	npx tsc --outDir "$(CURDIR)\js"
	"$(CURDIR)"\node_modules\.bin\browserify "$(CURDIR)"\js\index.js -p esmify > "$(CURDIR)"\js\bundle.js
	move "$(CURDIR)\js\$(MAIN)" "$(CURDIR)\$(MAIN)"
	node "$(CURDIR)\$(MAIN)"

setup:
	mkdir $(OUTDIR)
	mkdir $(SRCDIR)
