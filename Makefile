# GAS Boilerplate - simple command wrappers

.PHONY: help new clone pull push release setup-repos test-repos list projects update upgrade validate logs config

help:
	@echo "GAS Boilerplate - commands"
	@echo ""
	@echo "Projects:"
	@echo "  make new name          - create project"
	@echo "  make clone name        - add to config"
	@echo "  make pull name         - download"
	@echo "  make push name         - upload"
	@echo "  make list              - list projects"
	@echo "  make projects          - show config"
	@echo ""
	@echo "System:"
	@echo "  make release           - release"
	@echo "  make setup-repos [url] - setup git"
	@echo "  make test-repos        - test git"
	@echo "  make update            - check updates"
	@echo "  make upgrade           - upgrade"
	@echo "  make validate          - validate"
	@echo "  make logs              - logs"
	@echo "  make config            - config"
	@echo ""
	@echo "Examples:"
	@echo "  make new leads"
	@echo "  make clone leads"

# Projects
new:
	@npx ts-node src/gas.ts new $(name)

clone:
	@npx ts-node src/gas.ts clone $(name)

pull:
	@npx ts-node src/gas.ts pull $(name)

push:
	@npx ts-node src/gas.ts push $(name)

list:
	@npx ts-node src/gas.ts list

projects:
	@npx ts-node src/gas.ts projects

# System
release:
	@npx ts-node src/gas.ts release

setup-repos:
	@npx ts-node src/gas.ts setup-repos $(REPO_URL)

test-repos:
	@npx ts-node src/gas.ts test-repos

update:
	@npx ts-node src/gas.ts check

upgrade:
	@npx ts-node src/gas.ts upgrade

validate:
	@npx ts-node src/gas.ts validate

logs:
	@npx ts-node src/gas.ts logs

config:
	@npx ts-node src/gas.ts config


