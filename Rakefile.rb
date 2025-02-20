# Obviously, this isn't needed, and you probably don't want to install the ruby interpreter anyway.
# It's here purely as a guide to how to clean the environment, and the commands to compile and publish the project.
require 'rake/clean'

CLOBBER.include('output')
CLOBBER.include('wwwroot/js/*')

desc "Compile"
task :compile do
    sh('spago build')
end

desc "Build"
task :build do
    sh('spago bundle-app -t wwwroot/js/index.js')
end