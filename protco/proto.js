/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
'use strict'

var $protobuf = require('protobufjs/light')

var $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root()))
  .setOptions({
    go_package: '/proto'
  })
  .addJSON({
    admin: {
      nested: {
        SysCtfGetTopicInfo: {
          fields: {
            type: {
              type: 'string',
              id: 1
            },
            pageSize: {
              type: 'uint32',
              id: 2
            },
            currentPage: {
              type: 'uint32',
              id: 3
            }
          }
        },
        SysCtfDeleteTopic: {
          fields: {
            type: {
              type: 'string',
              id: 1
            },
            id: {
              rule: 'repeated',
              type: 'string',
              id: 2
            }
          }
        },
        SysCtfCreateTopic: {
          fields: {
            title: {
              type: 'string',
              id: 1
            },
            desc: {
              type: 'string',
              id: 2
            },
            score: {
              type: 'uint32',
              id: 3
            },
            time: {
              type: 'uint32',
              id: 4
            },
            overTime: {
              type: 'uint32',
              id: 5
            },
            flag: {
              type: 'string',
              id: 6
            },
            url: {
              type: 'string',
              id: 7
            },
            image: {
              type: 'string',
              id: 8
            },
            type: {
              type: 'string',
              id: 9
            }
          }
        },
        SysCtfUpdateTopic: {
          fields: {
            title: {
              type: 'string',
              id: 1
            },
            desc: {
              type: 'string',
              id: 2
            },
            score: {
              type: 'uint32',
              id: 3
            },
            time: {
              type: 'uint32',
              id: 4
            },
            overTime: {
              type: 'uint32',
              id: 5
            },
            flag: {
              type: 'string',
              id: 6
            },
            url: {
              type: 'string',
              id: 7
            },
            image: {
              type: 'string',
              id: 8
            },
            id: {
              type: 'string',
              id: 9
            },
            type: {
              type: 'string',
              id: 10
            }
          }
        },
        SysCveGetTopicInfo: {
          fields: {
            type: {
              type: 'string',
              id: 1
            },
            pageSize: {
              type: 'uint32',
              id: 2
            },
            currentPage: {
              type: 'uint32',
              id: 3
            }
          }
        },
        SysCveDeleteTopic: {
          fields: {
            type: {
              type: 'string',
              id: 1
            },
            id: {
              rule: 'repeated',
              type: 'string',
              id: 2
            }
          }
        },
        SysCveCreateTopic: {
          fields: {
            title: {
              type: 'string',
              id: 1
            },
            desc: {
              type: 'string',
              id: 2
            },
            time: {
              type: 'uint32',
              id: 3
            },
            overTime: {
              type: 'uint32',
              id: 4
            },
            image: {
              type: 'string',
              id: 5
            },
            type: {
              type: 'string',
              id: 6
            }
          }
        },
        SysCveUpdateTopic: {
          fields: {
            title: {
              type: 'string',
              id: 1
            },
            desc: {
              type: 'string',
              id: 2
            },
            time: {
              type: 'uint32',
              id: 3
            },
            overTime: {
              type: 'uint32',
              id: 4
            },
            image: {
              type: 'string',
              id: 5
            },
            id: {
              type: 'string',
              id: 6
            },
            type: {
              type: 'string',
              id: 7
            }
          }
        },
        SysLabsGetTopicInfo: {
          fields: {
            type: {
              type: 'string',
              id: 1
            },
            pageSize: {
              type: 'uint32',
              id: 2
            },
            currentPage: {
              type: 'uint32',
              id: 3
            }
          }
        },
        SysLabsDeleteTopic: {
          fields: {
            type: {
              type: 'string',
              id: 1
            },
            id: {
              rule: 'repeated',
              type: 'string',
              id: 2
            }
          }
        },
        SysLabsCreateTopic: {
          fields: {
            title: {
              type: 'string',
              id: 1
            },
            desc: {
              type: 'string',
              id: 2
            },
            time: {
              type: 'uint32',
              id: 3
            },
            overTime: {
              type: 'uint32',
              id: 4
            },
            image: {
              type: 'string',
              id: 5
            },
            type: {
              type: 'string',
              id: 6
            }
          }
        },
        SysLabsUpdateTopic: {
          fields: {
            title: {
              type: 'string',
              id: 1
            },
            desc: {
              type: 'string',
              id: 2
            },
            time: {
              type: 'uint32',
              id: 3
            },
            overTime: {
              type: 'uint32',
              id: 4
            },
            image: {
              type: 'string',
              id: 5
            },
            id: {
              type: 'string',
              id: 6
            },
            type: {
              type: 'string',
              id: 7
            }
          }
        },
        SysUserCreateUser: {
          fields: {
            username: {
              type: 'string',
              id: 1
            },
            password: {
              type: 'string',
              id: 2
            },
            email: {
              type: 'string',
              id: 3
            },
            role: {
              type: 'string',
              id: 4
            },
            score: {
              type: 'uint64',
              id: 5
            },
            active: {
              type: 'bool',
              id: 6
            }
          }
        },
        SysUserUpdateUser: {
          fields: {
            id: {
              type: 'string',
              id: 1
            },
            username: {
              type: 'string',
              id: 2
            },
            password: {
              type: 'string',
              id: 3
            },
            email: {
              type: 'string',
              id: 4
            },
            role: {
              type: 'string',
              id: 5
            },
            score: {
              type: 'uint64',
              id: 6
            },
            active: {
              type: 'bool',
              id: 7
            }
          }
        },
        SysUserSearchUser: {
          fields: {
            pageSize: {
              type: 'uint32',
              id: 1
            },
            currentPage: {
              type: 'uint32',
              id: 2
            },
            role: {
              type: 'string',
              id: 3
            },
            startTime: {
              type: 'string',
              id: 4
            },
            endTime: {
              type: 'string',
              id: 5
            },
            minScore: {
              type: 'uint64',
              id: 6
            },
            maxScore: {
              type: 'uint64',
              id: 7
            },
            active: {
              type: 'string',
              id: 8
            },
            userEmail: {
              type: 'string',
              id: 9
            }
          }
        },
        SysUserDeleteUser: {
          fields: {
            id: {
              rule: 'repeated',
              type: 'string',
              id: 1
            }
          }
        },
        SysUserGetUserInfo: {
          fields: {
            pageSize: {
              type: 'uint32',
              id: 1
            },
            currentPage: {
              type: 'uint32',
              id: 2
            }
          }
        },
        SysUserGetUserTasksInfo: {
          fields: {
            email: {
              type: 'string',
              id: 1
            },
            pageSize: {
              type: 'uint32',
              id: 2
            },
            currentPage: {
              type: 'uint32',
              id: 3
            }
          }
        },
        SysUserDeleteTasks: {
          fields: {
            email: {
              type: 'string',
              id: 1
            },
            id: {
              rule: 'repeated',
              type: 'string',
              id: 2
            }
          }
        },
        SysUserGetUserTaskOverInfo: {
          fields: {
            email: {
              type: 'string',
              id: 1
            },
            pageSize: {
              type: 'uint32',
              id: 2
            },
            currentPage: {
              type: 'uint32',
              id: 3
            }
          }
        }
      }
    },
    ctf: {
      nested: {
        CtfFlag: {
          fields: {
            id: {
              type: 'string',
              id: 1
            },
            type: {
              type: 'string',
              id: 2
            },
            flag: {
              type: 'string',
              id: 3
            }
          }
        },
        CtfGetRevOne: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        },
        CtfGetWebOne: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        },
        CtfGetPwnOne: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        },
        CtfGetMiscOne: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        }
      }
    },
    cve: {
      nested: {
        CveGetTopicInfo: {
          fields: {
            type: {
              type: 'string',
              id: 1
            }
          }
        },
        CveGetOneTopicInfo: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        }
      }
    },
    docker: {
      nested: {
        DockerStart: {
          fields: {
            id: {
              type: 'string',
              id: 1
            },
            type: {
              type: 'string',
              id: 2
            }
          }
        },
        DockerStop: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        }
      }
    },
    labs: {
      nested: {
        LabsGetTopicInfo: {
          fields: {
            type: {
              type: 'string',
              id: 1
            }
          }
        },
        LabsGetOneTopicInfo: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        }
      }
    },
    register: {
      nested: {
        RegisterUserInfo: {
          fields: {
            username: {
              type: 'string',
              id: 1
            },
            password: {
              type: 'string',
              id: 2
            },
            email: {
              type: 'string',
              id: 3
            },
            emailCode: {
              type: 'string',
              id: 4
            },
            imageCode: {
              type: 'string',
              id: 5
            },
            imageId: {
              type: 'string',
              id: 6
            },
            mouse: {
              type: 'string',
              id: 7
            }
          }
        }
      }
    },
    user: {
      nested: {
        UserUserLogin: {
          fields: {
            email: {
              type: 'string',
              id: 1
            },
            password: {
              type: 'string',
              id: 2
            },
            imageCode: {
              type: 'string',
              id: 3
            },
            imageId: {
              type: 'string',
              id: 4
            },
            mouse: {
              type: 'string',
              id: 5
            }
          }
        },
        UserUserLogout: {
          fields: {
            mouse: {
              type: 'string',
              id: 1
            }
          }
        },
        UserUpdateAvatar: {
          fields: {
            avatar: {
              type: 'string',
              id: 1
            }
          }
        },
        UserGetTaskOne: {
          fields: {
            id: {
              type: 'string',
              id: 1
            }
          }
        }
      }
    }
  })

module.exports = $root
