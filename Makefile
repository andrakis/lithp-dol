LIBS=
COMPILE=./run
COMPILEFLAGS=-m
RUN=./run ./index.ast

.PHONY: node_modules/lithp modules src

AST = $(patsubst %.lithp, %.ast, $(wildcard *.lithp))

SUBDIRS = node_modules/lithp modules src
default: $(AST) final $(SUBDIRS)
all: default

FINAL=

%.ast: %.lithp
	$(eval FINAL += $<)

final:
	@if [ "$(FINAL)"x != "x" ]; then $(COMPILE) $(COMPILEFLAGS) -c $(FINAL); fi

run: all index.ast
	$(RUN) $(RUNFLAGS)

$(SUBDIRS):
	echo "Running make with flags: $(COMPILEFLAGS)"
	$(MAKE) -C $@ COMPILEFLAGS=$(COMPILEFLAGS)

clean:
	-rm -f *.ast
	$(MAKE) -C node_modules/lithp clean
	$(MAKE) -C modules clean
	$(MAKE) -C src clean

