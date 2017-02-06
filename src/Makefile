LIBS=
COMPILE=../run
COMPILEFLAGS=

.PHONY:

AST = $(patsubst %.lithp, %.ast, $(wildcard *.lithp))

default: $(AST) final
all: default

FINAL=

%.ast: %.lithp
	$(eval FINAL += $<)

final:
	@if [ "$(FINAL)"x != "x" ]; then $(COMPILE) $(COMPILEFLAGS) -c $(FINAL); fi

clean:
	-rm -f *.ast

