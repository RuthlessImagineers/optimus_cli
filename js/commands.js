#!/usr/bin/env node
const cmd=require('node-cmd');
var logSymbols = require('log-symbols');
var os = require('os');
var ProgressBar = require('progress');
var colors = require('colors/safe');

module.exports = function Commands(){
  var error;
  this.verifyJava = function() {
    cmd.get(
      'java -version',
      function(data,err) {
      console.log(logSymbols.info,'Verifying if java is installed');
      error = err;
      if(!err) {
        console.log(logSymbols.success,'Java is installed.');
      } else {
        console.log(logSymbols.error,'Java is not installed');
      }
    });
  }
  
  this.installJava= function() {
      cmd.get(
        'java -version',
        function(data,err) {
        error = err;
        if(err) {
          switch (os.platform()) {
            case "darwin":
            console.log(logSymbols.warning,colors.yellow('Installing Java..'));
              cmd.get('brew cask install java',function(data,err) {
              error = err;
              if(!err) {
                console.log(logSymbols.success,'Installed java successfully');
              } else {
                console.log(logSymbols.error,colors.red('Failed to install java, install it manually'));
              }
            });
              break;
            case 'linux':
            console.log(logSymbols.error,colors.red('Java is not installed, installing it manually!!'));
            break;
            case "win32":
            console.log(logSymbols.warning,colors.yellow('Installing Java..'));
              cmd.get('choco install jdk8',function(data,err) {
              error = err;
              if(!err) {
                console.log(logSymbols.success,'Installed java successfully');
              } else {
                console.log(logSymbols.error,colors.red('Failed to install java, install it manually'));
              }
            });
              break;
          }
        }
      });
}


this.verifyAppium = function() {
  cmd.get(
        'appium -v',
        function(data,err){
          error = err;
          console.log(logSymbols.info,"Verifying if appium is installed");
          if(!err) {
            console.log(logSymbols.success,'Appium is installed.');
          } else {
            console.log(logSymbols.error,"Appium is not installed");
          }
      });
}

this.installAppium = function() {
  cmd.get(
        'appium -v',
        function(data,err){
          error = err;
          if(err) {
            console.log(logSymbols.warning,colors.magenta("Installing Appium.."));
            var appiumInstalled;
            cmd.get('npm install -g appium',function(data,err) {
              error = err;
              if(!err) {
                appiumInstalled = true;
                console.log(logSymbols.success,'Installed appium successfully');
              } else {
                appiumInstalled = false;
                console.log(logSymbols.error,colors.red('Failed to install appium, install it manually'),err);
              }
            });
          }
      });
}

this.verifyRethinkDB = function() {
  cmd.get(
    'rethinkdb -v',
    function(data,err) {
    console.log(logSymbols.info,"Verifying if RethinkDB is installed");
    if(!err) {
      console.log(logSymbols.success,'RethinkDB is installed');
    } else {
      console.log(logSymbols.error,"RethinkDB is not installed");
    }
  });
}

  this.installRethinkDB = function() {
    var rethinkInstalled;
    cmd.get(
      'rethinkdb -v',
      function(data,err) {
      if(err) {
        rethinkInstalled=false;
        console.log(logSymbols.warning,colors.cyan("Installing RethinkDB.."));
        switch (os.platform()) {
          case "darwin": case "linux":
          cmd.get('brew install rethinkdb', function(data,err) {
            if(!err) {
              console.log(logSymbols.success,'Installed RethinkDB successfully');
            } else {
              console.log(logSymbols.error,colors.red('Failed to install RethinkDB, install it manually from "https://rethinkdb.com/docs/install/ubuntu/"'),err);
            }
          });
            break;
            case "win32":
            cmd.get('choco install rethinkdb', function(data,err) {
              if(!err) {
                console.log(logSymbols.success,'Installed RethinkDB successfully');
              } else {
                console.log(logSymbols.error,colors.red('Failed to install RethinkDB, install it manually'),err);
              }
            });
          break;
        }

      }
    });
  }

  this.verifyRedis = function() {
      cmd.get(
        'redis-cli -v',
        function(data,err) {
        console.log(logSymbols.info,"Verifying if Redis is installed");
        if(!err) {
          console.log(logSymbols.success,'Redis is installed');
        } else {
          console.log(logSymbols.error,"Redis is not installed");
        }
      });
  }

  this.installRedis = function() {
      cmd.get(
        'redis-cli -v',
        function(data,err) {
        if(err) {
          console.log(logSymbols.warning,colors.gray("Installing Redis.."));
          switch (os.platform()) {
            case "darwin": case "linux":
            cmd.get('brew install redis', function(data,err) {
              if(!err) {
                console.log(logSymbols.success,'Installed Redis successfully');
              } else {
                console.log(logSymbols.error,colors.red('Failed to install Redis, install it manually'),err);
              }
            });

              break;
              case "win32":
              cmd.get('choco install redis', function(data,err) {
                if(!err) {
                  console.log(logSymbols.success,'Installed Redis successfully');
                } else {
                  console.log(logSymbols.error,colors.red('Failed to install Redis, install it manually'),err);
                }
              });
            break;
          }

        }
      });
  }

  this.verifyAPT = function() {
    cmd.get('adb version', function(data,err) {
      error = err;
      console.log(logSymbols.info,"Verifying if android platform tools is installed");
      if(!err) {
        console.log(logSymbols.success,'Android platform tools is installed.');
      } else {
        console.log(logSymbols.error,'Android platform tools is not found');
      }
    });
  }

  this.installAPT = function() {
    cmd.get('adb version', function(data,err) {
      error = err;
      if(err) {
        console.log(logSymbols.warning,'Installing Android platform tools..');
        switch (os.platform()) {
          case "darwin":case "linux":
          cmd.get('brew install android-platform-tools',function(data,err) {
            error = err;
            if(!err) {
              console.log(logSymbols.success,'Installed, android platform tools successfully.');
            } else {
              console.log(logSymbols.error,colors.red('Failed to install android platform tools, install it manually'));
            }
          })
            break;
            case "win32":
            cmd.get('choco install adb',function(data,err) {
              error = err;
              if(!err) {
                console.log(logSymbols.success,'Installed, android platform tools successfully.');
              } else {
                console.log(logSymbols.error,colors.red('Failed to install android platform tools, install it manually'));
              }
            })
              break;
          default:

        }
      }
    });
  }

  this.verifyXcode = function() {
    switch (os.platform()) {
      case "darwin":
      cmd.get('xcodebuild -version',function(data,err) {
          error = err;
          console.log(logSymbols.info,'Verifying if xcode is installed');
          if(!err) {
            console.log(logSymbols.success,'Found xcode on this machine.');
            console.log(logSymbols.info,"Checking if FBSimctl is installed");
            cmd.get('fbsimctl list',function(data,err) {
              if(!err) {
                console.log(logSymbols.success,'FBSimctl is installed');
              } else {
                console.log(logSymbols.error, 'FBSimctl is not installed');
              }
              });
              } else {
            console.log(logSymbols.error,colors.red('Xcode is not installed, install it manually!!'));
            }
        });
        break;
    }
  }


  this.installFBSimctl = function() {
    switch (os.platform()) {
      case "darwin":
      cmd.get('xcodebuild -version',function(data,err) {
        if(!err) {
          cmd.get('fbsimctl list',function(data,err) {
            if(err) {
              console.log(logSymbols.warning, 'Installing FBSimctl...');
              cmd.get('brew tap facebook/fb',function(data, err) {
                if(!err) {
                  cmd.get('brew install fbsimctl',function(data,err) {
                    if(!err) {
                      console.log(logSymbols.success,'Installed FBSimctl Successfully');
                    } else {
                      console.log(logSymbols.error, 'Failed to install FBSimctl, please check if you have XCode version 8.2 installed and try again');
                    }
              });
            }
            });
            }
          })
        }
      });
        break;
      default:
      console.log(logSymbols.info,'Your plaform does not support xcode');
      break;
    }
  }


  this.verifyGradle = function() {
    cmd.get('gradle -v', function(data,err) {
      error = err;
      console.log(logSymbols.info,"Verifying if gradle is installed");
      if(!err) {
        console.log(logSymbols.success,'Gradle is installed.');
      } else {
        console.log(logSymbols.error,'Gradle is not found');
      }
    });
  }

  this.installGradle = function() {
    cmd.get('gradle -v', function(data,err) {
      error = err;
      if(err) {
        console.log(logSymbols.warning,colors.grey('Installing Gradle...'));
        switch (os.platform()) {
          case "darwin":case "linux":
          cmd.get('brew install gradle',function(data,err) {
            error = err;
            if(!err) {
              console.log(logSymbols.success,'Installed gradle successfully.');
            } else {
              console.log(logSymbols.error,colors.red('Failed to install gradle, install it manually'));
            }
          })
            break;
            case "win32":
            cmd.get('choco install gradle',function(data,err) {
              error = err;
              if(!err) {
                console.log(logSymbols.success,'Installed gradle successfully.');
              } else {
                console.log(logSymbols.error,colors.red('Failed to install gradle, install it manually'));
              }
            })
              break;
          default:

        }
      }
    });
  }


}
