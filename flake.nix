# Nix flake for reproducible bundler environments
# Usage:
# `nix run .` defaults to `bundle exec jekyll build`
# `nix run . args` expands to `bundle exec jekyll  args`
# `nix run .#bundle args` expands to `bundle args`
# `nix run .#bundix -- -m` generates gemset.nix
# `nix develop` enters development shell with all dependencies
#
# Getting started:
# 1) Generate Gemfile with `nix run .#bundle add ...`
# 2) Lock it with `nix run .#bundle lock`
# 3) Generate gemset.nix with `nix run .#bundix -- -m`
# 4) Build jekyll site with `nix run .`
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    bundix = {
      url = "github:inscapist/bundix/main";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    ruby-nix = {
      url = "github:inscapist/ruby-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    bundix,
    ruby-nix
  }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let

        pkgs = import nixpkgs {
          inherit system;
          overlays = [ ruby-nix.overlays.ruby ];
        };
        rubyNix = ruby-nix.lib pkgs;
		    bundixcli = bundix.packages.${system}.default;

        deps = with pkgs; [ env ruby bundixcli jekyll ];

        inherit (rubyNix {
          name = "github.comx/phdenzel/phdenzel.github.io";
          gemset = ./gemset.nix;
          gemConfig = pkgs.defaultGemConfig;
        })
          env ruby;
      in {
        packages = let
          bundlecli = pkgs.writeShellApplication {
            name = "bundle";
            runtimeInputs = deps;
            text = ''
              export BUNDLE_PATH=vendor/bundle
              bundle "$@"
            '';
          };
          jekyll = pkgs.writeShellApplication {
            name = "jekyll";
            runtimeInputs = deps;
            text = ''
              if [ $# -eq 0 ]; then
                bundle exec jekyll build
              else
                bundle exec jekyll "$@"
              fi
            '';
          };
        in {
          jekyll = jekyll;
          bundle = bundlecli;
          bundix = bundixcli;
          default = jekyll;
        };

        devShells.default = pkgs.mkShell {
          shellHook = ''
            export BUNDLE_PATH=vendor/bundle
            export BUNDLE_FORCE_RUBY_PLATFORM=true
            bundle install
          '';
          buildInputs = deps;
        };
      }
    );
}
