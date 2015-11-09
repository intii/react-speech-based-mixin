var Arrow, Bar, CheckList, Clock, Demo, KV, Message, Nest, Over, ReactTransitionGroup, TV, WitBox, a, button, circle, data, days, div, hr, i, iframe, img, input, li, months, p, path, pre, pretty_date, ref, rows, span, svg, table, tbody, td, textarea, tr, ul, zpad;

ref = React.DOM, i = ref.i, p = ref.p, img = ref.img, span = ref.span, a = ref.a, button = ref.button, hr = ref.hr, input = ref.input, iframe = ref.iframe, textarea = ref.textarea, div = ref.div, pre = ref.pre, table = ref.table, tbody = ref.tbody, tr = ref.tr, td = ref.td, ul = ref.ul, li = ref.li, svg = ref.svg, circle = ref.circle, path = ref.path;

ReactTransitionGroup = React.addons.TransitionGroup;

days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

zpad = function(x) {
  if (x < 10) {
    return '0' + x;
  } else {
    return '' + x;
  }
};

pretty_date = function(d) {
  var D, M, dow, h, m, pretty_d, pretty_t, suffix;
  if (!(d instanceof Date)) {
    throw new Error("Not a Date");
  }
  h = zpad(d.getHours());
  m = zpad(d.getMinutes());
  M = months[d.getMonth()];
  D = zpad(d.getDate());
  dow = days[d.getDay()];
  suffix = (function() {
    if (D < 11 || D > 13) {
      switch (D % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    } else {
      return 'th';
    }
  })();
  pretty_d = dow + ", " + M + " " + D + suffix;
  pretty_t = h + ":" + m;
  return [pretty_d, pretty_t];
};

data = {
  zooms: {
    alarm: {
      cx: 1245,
      cy: 413,
      r: 30
    },
    TV: {
      cx: 471,
      cy: 358,
      r: 60
    },
    nest: {
      cx: '37.35%',
      cy: '48.5%',
      r: 35
    }
  },
  tv: {
    w: 640,
    h: 360,
    x: -55,
    y: -69
  }
};

Over = React.createClass({
  displayName: 'Over',
  render: function() {
    var cl;
    cl = 'overlay ';
    if (this.props.className) {
      cl += this.props.className;
    }
    return div({
      className: cl
    });
  }
});

Nest = React.createClass({
  displayName: 'Nest',
  render: function() {
    var ch, cl;
    cl = 'nest-img nest';
    ch = [
      div({
        key: 'temp',
        className: 'nest-text nest-temp'
      }, this.props.temp)
    ];
    if (this.props.unit) {
      ch.push(div({
        key: 'unit',
        className: 'nest-text nest-unit'
      }, this.props.unit));
    }
    return div({
      className: cl
    }, ch);
  }
});

Clock = React.createClass({
  displayName: 'Clock',
  componentDidMount: function() {
    var center, rootNode;
    rootNode = this.getDOMNode();
    return center = function(node) {
      var $n, l, nh, nw, t;
      $n = $(node);
      nw = $n.width();
      nh = $n.height();
      l = $n.offset().left - nw / 2;
      t = $n.offset().top - nh / 2;
      return $n.offset({
        left: l,
        top: t
      });
    };
  },
  render: function() {
    var ch, cl, d, pretty_d, pretty_t, ref1;
    if ((d = this.props.datetime)) {
      ref1 = pretty_date(d), pretty_d = ref1[0], pretty_t = ref1[1];
      ch = [
        div({
          key: 'al',
          className: 'clock-alarm'
        }, "Alarm set at"), div({
          key: 'time',
          className: 'clock-time'
        }, pretty_t), div({
          key: 'date',
          className: 'clock-date'
        }, pretty_d)
      ];
    } else {
      ch = [
        div({
          key: 'no',
          className: "clock-nope"
        }, "No alarm set")
      ];
    }
    cl = 'clock clock-img';
    return div({
      ref: 'clock',
      className: cl
    }, div({
      className: 'pebble-screen'
    }, ch));
  }
});

TV = React.createClass({
  displayName: 'TV',
  getDefaultProps: function() {
    return {
      channel: null
    };
  },
  componentDidMount: function() {
    var center, frame_node, if_node, ref1, rootNode;
    rootNode = this.getDOMNode();
    center = function(node) {
      var $n, l, nh, nw, t;
      $n = $(node);
      nw = $n.width();
      nh = $n.height();
      l = $n.offset().left - nw / 2;
      t = $n.offset().top - nh / 2;
      return $n.offset({
        left: l,
        top: t
      });
    };
    frame_node = this.refs['frame'].getDOMNode();
    if ((if_node = (ref1 = this.refs['if']) != null ? ref1.getDOMNode() : void 0)) {
      return $(if_node).attr('frameborder', '0');
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    var if_node, ref1;
    if ((if_node = (ref1 = this.refs['if']) != null ? ref1.getDOMNode() : void 0)) {
      return $(if_node).attr('frameborder', '0');
    }
  },
  render: function() {
    var ch_screen, chan, channels, cl, video;
    channels = {
      pebble: 'eP9q8Ws6e2o',
      cats: 'J---aiyznGQ'
    };
    if ((chan = this.props.channel) && (video = channels[chan])) {
      ch_screen = [
        iframe({
          id: "ytplayer",
          key: 'if',
          ref: 'if',
          type: "text/html",
          width: "" + data.tv.w,
          height: "" + data.tv.h,
          src: "https://www.youtube.com/embed/" + video + "?autoplay=1&controls=0&disablekb=1&fs=0&loop=1&modestbranding=1&showinfo=0&html5=1"
        })
      ];
    } else {
      ch_screen = [];
    }
    cl = 'tv-frame';
    return div({
      ref: 'frame',
      key: 'frame',
      className: cl
    }, [
      div({
        ref: 'screen',
        key: 'screen',
        className: 'tv-screen',
        style: {
          position: 'relative',
          left: data.tv.x,
          top: data.tv.y
        }
      }, ch_screen)
    ]);
  }
});

rows = _.shuffle([
  [
    "Turn on all the lights", function(intent, entities) {
      var ref1, ref2;
      return intent === 'lights' && (entities != null ? (ref1 = entities.everywhere) != null ? ref1.value : void 0 : void 0) === 'true' && (entities != null ? (ref2 = entities.on_off) != null ? ref2.value : void 0 : void 0) === 'on';
    }
  ], [
    "Turn off the lights in the kitchen", function(intent, entities) {
      var ref1, ref2;
      return intent === 'lights' && (entities != null ? (ref1 = entities.room) != null ? ref1.value : void 0 : void 0) === 'kitchen' && (entities != null ? (ref2 = entities.on_off) != null ? ref2.value : void 0 : void 0) === 'off';
    }
  ], [
    "Set the temperature to 68 degrees", function(intent, entities) {
      var ref1, ref2;
      return intent === 'thermostat_set' && ((entities != null ? (ref1 = entities.temperature) != null ? (ref2 = ref1.value) != null ? ref2.temperature : void 0 : void 0 : void 0) != null);
    }
  ], [
    "Wake me up at 7 tomorrow morning", function(intent, entities) {
      var ref1;
      return intent === 'alarm_set' && (entities != null ? (ref1 = entities.datetime) != null ? ref1.value : void 0 : void 0);
    }
  ], [
    "Turn on the TV", function(intent, entities) {
      var ref1;
      return intent === 'tv_onoff' && (entities != null ? (ref1 = entities.on_off) != null ? ref1.value : void 0 : void 0) === 'on';
    }
  ], [
    "What time is it in Paris?", function(intent, entities) {
      var ref1;
      return intent === 'time' && (entities != null ? (ref1 = entities.location) != null ? ref1.value : void 0 : void 0) === 'Paris';
    }
  ], [
    "Tell me the weather in Las Vegas", function(intent, entities) {
      var ref1;
      return intent === 'weather' && (entities != null ? (ref1 = entities.location) != null ? ref1.value : void 0 : void 0);
    }
  ], [
    "How is Google doing on the stock market?", function(intent, entities) {
      var ref1;
      return intent === 'stockprice' && (entities != null ? (ref1 = entities.stock_name) != null ? ref1.value : void 0 : void 0);
    }
  ], [
    "Close the door", function(intent, entities) {
      var ref1, ref2;
      return intent === 'doors' && ((ref1 = entities != null ? (ref2 = entities.door_action) != null ? ref2.value : void 0 : void 0) === "close" || ref1 === "lock");
    }
  ], [
    "I want to watch cats", function(intent, entities) {
      var ref1, ref2;
      return intent === 'tv_onoff' && ((ref1 = entities != null ? (ref2 = entities.tv_channel) != null ? ref2.value : void 0 : void 0) === 'cats' || ref1 === 'cat');
    }
  ]
]);

CheckList = React.createClass({
  displayName: 'CheckList',
  render: function() {
    var ch, done, j, not_done, row;
    done = this.props.done || [];
    j = -1;
    row = (function(_this) {
      return function(body, pred) {
        var cl;
        cl = _.some(done, function(arg) {
          var x, y;
          x = arg[0], y = arg[1];
          return pred(x, y);
        }) ? 'fa fa-check-circle-o' : 'fa fa-circle-o';
        j++;
        return li({
          key: '' + j,
          className: 'check-row'
        }, [
          i({
            key: 'i',
            className: cl
          }), span({
            key: 's'
          }, body)
        ]);
      };
    })(this);
    not_done = function(arg) {
      var f, lbl;
      lbl = arg[0], f = arg[1];
      return !_.some(done, function(arg1) {
        var x, y;
        x = arg1[0], y = arg1[1];
        return f(x, y);
      });
    };
    ch = _.chain(rows).filter(not_done).take(4).map(function(arg) {
      var f, lbl;
      lbl = arg[0], f = arg[1];
      return row(lbl, f);
    }).unshift(div({
      key: 'try',
      className: 'try'
    }, "Did you try...")).value();
    return div({
      className: 'checklist',
      key: 'info'
    }, [
      ul({
        key: 'examples',
        className: 'check-rows'
      }, ch)
    ]);
  }
});

Message = React.createClass({
  displayName: 'Message',
  render: function() {
    var msg;
    if (this.props.msg) {
      msg = span({
        key: 'm'
      }, this.props.msg);
    } else {
      msg = CheckList({
        key: 'cl',
        done: this.props.done
      });
    }
    return ReactTransitionGroup({
      transitionName: 'message',
      component: div,
      className: 'message-box'
    }, [
      pre({
        key: 'm',
        className: 'msg'
      }, msg), div({
        key: 'p',
        className: 'portrait'
      })
    ]);
  }
});

KV = React.createClass({
  displayName: 'KV',
  render: function() {
    var foobar, k, kl, max_kl, n, o, pad, ref1, v;
    k = this.props.k;
    kl = k.length;
    max_kl = this.props.longest_k;
    v = _.isString(v = this.props.v) ? v : JSON.stringify(v, false, 2);
    pad = '';
    n = max_kl - kl;
    for (foobar = o = 0, ref1 = n; 0 <= ref1 ? o <= ref1 : o >= ref1; foobar = 0 <= ref1 ? ++o : --o) {
      pad += '&nbsp;';
    }
    return div({
      className: 'witbox-kv ' + (this.props.className || '')
    }, [
      span({
        className: 'witbox-k'
      }, k), span({
        dangerouslySetInnerHTML: {
          __html: pad
        }
      }), pre({
        className: 'witbox-v'
      }, "= " + v)
    ]);
  }
});

WitBox = React.createClass({
  displayName: 'WitBox',
  render: function() {
    var ch, entities, ents, intent, longest_k;
    intent = this.props.intent || 'no intent';
    entities = this.props.entities;
    longest_k = _.reduce(entities, function(acc, e, k) {
      var l;
      if (k && (l = k.length) > acc) {
        return l;
      } else {
        return acc;
      }
    }, 'intent'.length);
    ents = _.chain(entities).map(function(e, k) {
      return KV({
        k: k,
        v: e.value,
        longest_k: longest_k,
        color: Wit.color(e)
      });
    }).unshift(KV({
      k: 'intent',
      v: intent,
      longest_k: longest_k
    })).flatten(true);
    ch = [
      div({
        className: 'witbox-kvs'
      }, ents)
    ];
    return div({
      className: 'witbox bar-item'
    }, ch);
  }
});

Bar = React.createClass({
  displayName: 'Bar',
  componentDidMount: function() {
    this.ws = new WebSocket("ws://localhost:8888");
    return this.ws.onmessage = function(e) {
      var entities, intent, ref1, resp;
      ref1 = JSON.parse(e.data), intent = ref1[0], entities = ref1[1], resp = ref1[2];
      return this.props.got(intent, entities, resp);
    };
  },
  tooltip: function(msg) {
    var $n, arrow, body, bs_data, node, tip;
    body = msg === 'start' ? 'Click here to start (or press Space)' : 'Click here to stop (or press Space)';
    node = this.getDOMNode();
    if (!node) {
      console.error("No node for tooltip");
      return;
    }
    if (this.tooltip_node) {
      this.tooltip_node.tooltip('destroy');
    }
    $n = $(node);
    $n.tooltip({
      placement: 'top',
      title: body,
      trigger: 'manual'
    });
    $n.tooltip('show');
    this.tooltip_node = $n;
    if (msg === 'stop') {
      bs_data = $n.data('bs.tooltip');
      tip = bs_data.tip();
      arrow = bs_data.arrow();
      tip.addClass('tooltip-record');
    }
    return $(window).one('resize', (function(_this) {
      return function(e) {
        return _this.tooltip(msg);
      };
    })(this));
  },
  render: function() {
    var active, box, ch, chan, ur_own;
    chan = this.props.tv_channel;
    active = (function() {
      switch (this.props.active) {
        case 'alarm':
          return Clock({
            key: 'alarm',
            datetime: this.props.datetime
          });
        case 'nest':
          return Nest({
            key: 'nest',
            temp: this.props.temp,
            unit: this.props.unit
          });
        case 'TV':
          return TV({
            key: 'tv',
            channel: chan && chan.toLowerCase()
          });
      }
    }).call(this);
    active = active ? ReactTransitionGroup({
      key: 'active',
      transitionName: 'item',
      component: div,
      className: 'active-item'
    }, active) : Message({
      key: 'msg',
      msg: this.props.msg,
      done: this.props.done
    });
    ur_own = !active ? div({
      key: 'own',
      className: 'own'
    }, [
      a({
        className: 'btn',
        href: 'https://wit.ai'
      }, "Make your own voice interface!")
    ]) : void 0;
    box = WitBox({
      key: 'wit',
      intent: this.props.intent,
      entities: this.props.entities
    });
    ch = _.compact([
      box, div({
        key: 'mic',
        ref: 'mic',
        className: 'bar-item'
      }), active
    ]);
    return div({
      className: 'bar'
    }, ch);
  }
});

Arrow = React.createClass({
  displayName: 'Arrow',
  componentDidMount: function() {
    var $n, node;
    node = this.getDOMNode();
    $n = $(node);
    return this.interval = setInterval((function(_this) {
      return function() {
        $n.removeClass('wiggle');
        return setTimeout(function() {
          return $n.addClass('wiggle');
        });
      };
    })(this), 3000);
  },
  componentWillUnmount: function() {
    return clearInterval(this.interval);
  },
  render: function() {
    return div({
      className: 'wit-arrow animated wiggle'
    }, [
      i({
        className: 'fa fa-long-arrow-up'
      })
    ]);
  }
});

Demo = React.createClass({
  displayName: 'Demo',
  getInitialState: function() {
    return {
      msg: '',
      on_off: {
        lights_kitchen: 'off',
        lights_bedroom: 'off',
        lights_office: 'off',
        lights_livingroom: 'off'
      },
      active: null,
      tv_channel: null,
      alarm_time: null,
      nest_temp: 68,
      nest_unit: null,
      arrow: true
    };
  },
  componentWillMount: function(rootNode) {
    this.msg("Welcome to your virtual home. Click on the microphone and speak home automation commands.");
    return true;
  },
  handleError: function(e, err) {
    var idx, msgs;
    console.log('error', err);
    msgs = (function() {
      var ref1;
      switch ((ref1 = err.infos) != null ? ref1.code : void 0) {
        case "RESULT":
          return ["I didn't quite catch that ㅠ.ㅠ", "Sorry what? ^-^\"", "Go again? ._.", "What was that? ^-^\""];
        case "TIMEOUT":
          return ["Wit seems to be down..."];
        case "RECORD":
          return ["An error occured while recording your voice :<"];
        default:
          return ["Something went wrong..."];
      }
    })();
    idx = _.random(0, msgs.length - 1);
    return this.msg(msgs[idx]);
  },
  msg: function(msg) {
    if (this.msg_t) {
      clearTimeout(this.msg_t);
    }
    this.msg_t = setTimeout((function(_this) {
      return function() {
        return _this.setState({
          msg: ''
        });
      };
    })(this), 5000);
    return this.setState({
      msg: msg
    });
  },
  already: function(k, v) {
    var pretty;
    pretty = (function() {
      switch (k != null ? k.toLowerCase() : void 0) {
        case 'lights_kitchen':
          return 'The light in the kitchen';
        case 'lights_bathroom':
          return 'The light in the bathroom';
        case 'lights_bedroom':
          return 'The light in the bedroom';
        case 'lights_office':
          return 'The light in the office';
        case 'tv':
          return 'The TV set';
        case 'alarm':
          return 'Pebble said the alarm';
        default:
          return 'It';
      }
    })();
    return this.msg(pretty + " is already " + v + "!");
  },
  make_active: function(k, persistent) {
    if (this.active_t) {
      clearTimeout(this.active_t);
    }
    if (!persistent) {
      this.active_t = setTimeout((function(_this) {
        return function() {
          return _this.setState({
            active: null
          });
        };
      })(this), 5000);
    }
    return this.setState({
      active: k
    });
  },
  reset: function(obj) {
    var re;
    re = /lights_/;
    return _.each(obj, function(v, k) {
      if (re.test(k)) {
        return;
      }
      return obj[k] = 'off';
    });
  },
  got: function(intent, entities, resp) {
    var f, ref1;
    if ((f = this[intent])) {
      if (((ref1 = resp.outcome) != null ? ref1.confidence : void 0) && resp.outcome.confidence < 0.2) {
        return this.handleError("Sorry :(", {
          infos: {
            code: 'RESULT'
          }
        });
      }
      f.call(this, entities);
      return this.setState({
        done: (this.state.done || []).concat([[intent, entities]]),
        intent: intent,
        entities: entities
      });
    } else {
      console.log("Unknown intent", intent, entities);
      return this.msg("Your intent is " + intent + " but I have not been trained to do that...");
    }
  },
  need_room: function() {
    return this.msg("Sounds like you forgot to specify a room");
  },
  get_room: function(entities) {
    var room_ent, v;
    room_ent = entities != null ? entities.room : void 0;
    if ((v = room_ent != null ? room_ent.value : void 0) && (v === 'kitchen' || v === 'bathroom' || v === 'bedroom' || v === 'living room' || v === 'office')) {
      if (v === 'bathroom') {
        v = 'bedroom';
      }
      if (v === 'living room') {
        v = 'livingroom';
      }
      return v;
    } else {
      return null;
    }
  },
  do_on_off: function(val, desired) {
    if (val == null) {
      val = 'off';
    }
    if (desired === 'toggle') {
      if (val === 'off') {
        return 'on';
      } else {
        return 'off';
      }
    } else {
      return desired;
    }
  },
  on_off: function(entities, key, opts) {
    var current, new_val, o_o, on_off, quiet, re, ref1, ref2, room, room_required;
    if (opts == null) {
      opts = {};
    }
    room_required = opts.room_required, quiet = opts.quiet;
    on_off = (ref1 = entities.on_off) != null ? ref1.value : void 0;
    if (!(on_off === 'on' || on_off === 'off' || on_off === 'toggle')) {
      if (!quiet) {
        this.msg("Say what?");
      }
      return;
    }
    o_o = _.extend({}, this.state.on_off);
    if (((ref2 = entities.everywhere) != null ? ref2.value : void 0) === 'true') {
      re = new RegExp("^" + key + "_");
      _.each(o_o, (function(_this) {
        return function(v, k) {
          if (re.test(k)) {
            return o_o[k] = _this.do_on_off(o_o[k], on_off);
          }
        };
      })(this));
    } else {
      if ((room = this.get_room(entities))) {
        key += "_" + room;
      } else if (room_required) {
        if (!quiet) {
          this.need_room();
        }
        return;
      }
      current = o_o[key];
      new_val = this.do_on_off(current, on_off);
      o_o[key] = new_val;
      if (current === new_val) {
        if (!quiet) {
          this.already(key, current);
        }
      }
    }
    this.setState({
      on_off: o_o
    });
    return new_val;
  },
  handleReady: function() {
    if (this.state.arrow) {
      return this.setState({
        arrow: false
      });
    }
  },
  render: function() {
    var O_O, allow_arr, blog, ch, lights_ch, nya, re, svg_ch, toggle, toggle_active, toggle_lights;
    O_O = this.state.on_off;
    svg_ch = _.chain([] || data.zooms).map((function(_this) {
      return function(v, k) {
        var cx, cy, r, st, sw;
        cx = v.cx, cy = v.cy, r = v.r;
        sw = 6;
        st = '#eee';
        if (_this.state.active === k) {
          return circle({
            key: k,
            cx: cx,
            cy: cy,
            r: r,
            fill: 'none',
            strokeWidth: sw,
            stroke: st
          });
        }
      };
    })(this)).compact().value();
    re = /^lights_/;
    lights_ch = _.chain(O_O).map(function(v, k) {
      if ((k === 'doors' || re.test(k)) && (v === 'off')) {
        return Over({
          key: k,
          className: k
        });
      }
    }).compact().value();
    toggle = (function(_this) {
      return function(k, intent, entities) {
        return function(e) {
          var ents;
          ents = _.extend({
            on_off: {
              value: 'toggle'
            }
          }, entities);
          _this.msg('Toggling ' + k);
          return _this[intent](ents);
        };
      };
    })(this);
    toggle_lights = function(room) {
      var k;
      k = "lights";
      return toggle(k, "lights", {
        room: {
          value: room
        }
      });
    };
    toggle_active = function(item) {
      var intent;
      intent = (function() {
        switch (item) {
          case 'nest':
            return 'thermostat_set';
          case 'alarm':
            return 'alarm_set';
          case 'TV':
            return 'tv_onoff';
        }
      })();
      return toggle(item, intent, {});
    };
    allow_arr = this.state.arrow ? Arrow({}) : void 0;
    nya = !this.state.arrow ? a({
      key: 'made',
      href: 'https://wit.ai',
      className: 'made-by'
    }, [
      span({
        key: 'nom',
        className: 'nom'
      }, "Powered by Wit.AI"), span({
        key: 'nya',
        className: 'nya animated'
      }, " ^~^")
    ]) : void 0;
    blog = !this.state.arrow ? a({
      key: 'blog',
      className: 'blogpost',
      href: 'https://wit.ai/blog'
    }, [
      "Read our ", span({
        className: 'postlink'
      }, "blog post"), " explaining what Wit does"
    ]) : void 0;
    ch = _.chain([
      Over({
        key: 'h',
        className: 'house'
      }), ReactTransitionGroup({
        key: 'lights',
        transitionName: 'lights',
        component: div
      }, lights_ch), ReactTransitionGroup({
        key: 'svg',
        transitionName: 'svg',
        className: 'svg-canvas overlay',
        component: svg
      }, svg_ch), Bar({
        key: 'b',
        msg: this.state.msg,
        onError: this.handleError,
        got: this.got,
        intent: this.state.intent,
        entities: this.state.entities,
        done: this.state.done,
        active: this.state.active,
        temp: this.state.nest_temp,
        unit: this.state.nest_unit,
        datetime: this.state.alarm_time,
        onReady: this.handleReady,
        onAudioStart: (function(_this) {
          return function() {
            return _this.on_off({
              on_off: {
                value: 'off'
              }
            }, 'TV', {
              quiet: true
            });
          };
        })(this),
        tv_channel: O_O.TV === 'on' && this.state.tv_channel
      }), div({
        key: 'btns',
        className: 'btns',
        style: {
          display: 'none'
        }
      }, [
        button({
          key: 'n',
          onClick: toggle_active('nest')
        }, 'nest'), button({
          key: 't',
          onClick: toggle_active('TV')
        }, 'TV'), button({
          key: 'a',
          onClick: toggle_active('alarm')
        }, 'alarm'), button({
          key: 'kit',
          onClick: toggle_lights('kitchen')
        }, 'kitchen'), button({
          key: 'br',
          onClick: toggle_lights('bedroom')
        }, 'bedroom'), button({
          key: 'office',
          onClick: toggle_lights('office')
        }, 'office'), button({
          key: 'livingroom',
          onClick: toggle_lights('livingroom')
        }, 'livingroom')
      ]), p({
        key: 'json',
        className: 'json',
        style: {
          display: 'none'
        }
      }, JSON.stringify(_.pick(this.state, 'on_off', 'active'))), nya, blog, allow_arr
    ]).compact().value();
    return div({
      className: 'demo'
    }, ch);
  },

  /*
   o8o                  .                             .
   `"'                .o8                           .o8
  oooo  ooo. .oo.   .o888oo  .ooooo.  ooo. .oo.   .o888oo  .oooo.o
  `888  `888P"Y88b    888   d88' `88b `888P"Y88b    888   d88(  "8
   888   888   888    888   888ooo888  888   888    888   `"Y88b.
   888   888   888    888 . 888    .o  888   888    888 . o.  )88b
  o888o o888o o888o   "888" `Y8bod8P' o888o o888o   "888" 8""888P'
   */
  alarm_onoff: function(entities) {
    var k;
    k = 'alarm';
    this.on_off(entities, k);
    return this.make_active(k);
  },
  alarm_set: function(entities) {
    var d, da, datetime, ref1, ref2, ref3, ti;
    datetime = (ref1 = entities.datetime) != null ? (ref2 = ref1.value) != null ? ref2.from : void 0 : void 0;
    if (!datetime) {
      this.msg("I don't know when to schedule your alarm...");
      return;
    }
    d = new Date(datetime);
    ref3 = pretty_date(d), da = ref3[0], ti = ref3[1];
    this.msg("I set an alarm at " + ti + " on " + da);
    this.make_active('alarm');
    return this.setState({
      alarm_time: d
    });
  },
  blinds: function(entities) {
    return this.msg("The blinds are fine as they are!");
  },
  doors: function(entities) {
    var k, o_o, ref1, v;
    k = 'doors';
    v = entities != null ? (ref1 = entities.door_action) != null ? ref1.value : void 0 : void 0;
    if (v === 'unlock' || v === 'open') {
      v = 'on';
    } else if (v === 'lock' || v === 'close') {
      v = 'off';
    }
    if (v === 'on') {
      this.msg('I opened the door!');
    } else if (v === 'off') {
      this.msg('I closed the door!');
    } else {
      this.msg('What about the door?');
    }
    o_o = _.extend({}, this.state.on_off);
    o_o[k] = v;
    return this.setState({
      on_off: o_o
    });
  },
  fans: function(entities) {
    return this.msg("You're mistaken, there are no fans in this house!");
  },
  greetings_bye: function(e) {
    return this.msg("Alright, see you later!");
  },
  greetings_hi: function(e) {
    return this.msg("Howdy!");
  },
  greetings_insult: function(e) {
    return this.msg("Don't be mean.. I be sad now ㅠ.ㅠ");
  },
  greetings_mood: function(e) {
    return this.msg("All work and no play makes Wit a dull boy...");
  },
  lights: function(entities) {
    return this.on_off(entities, 'lights', {
      room_required: true
    });
  },
  stockprice: function(entities) {
    var ref1, stock, tag;
    stock = (ref1 = entities.stock_name) != null ? ref1.value : void 0;
    if (!stock) {
      return this.msg("Finance... what stocks are you interested in?");
    }
    this.msg(stock + " you say... Let me look it up...");
    tag = document.createElement('script');
    tag.src = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=" + stock + "&callback=YAHOO.Finance.SymbolSuggest.ssCallback";
    window.YAHOO = {
      Finance: {
        SymbolSuggest: {
          ssCallback: (function(_this) {
            return function(data) {
              var ref2, ref3, ref4, ticker;
              tag.remove();
              ticker = (ref2 = data.ResultSet) != null ? (ref3 = ref2.Result) != null ? (ref4 = ref3[0]) != null ? ref4.symbol : void 0 : void 0 : void 0;
              if (!ticker) {
                _this.msg("I don't know any company called " + stock + "..!");
                return;
              }
              return $.ajax({
                type: 'GET',
                url: "http://finance.yahoo.com/webservice/v1/symbols/" + ticker + "/quote?format=json",
                dataType: 'jsonp',
                error: function() {
                  console.log('error', arguments);
                  return _this.msg("Something went wrong when looking up " + stock + " (" + ticker + ")..!");
                },
                success: function(data) {
                  var fields, name, price, ref5, ref6, ref7, ref8, symbol;
                  fields = (ref5 = data.list) != null ? (ref6 = ref5.resources) != null ? (ref7 = ref6[0]) != null ? (ref8 = ref7.resource) != null ? ref8.fields : void 0 : void 0 : void 0 : void 0;
                  if (!fields) {
                    _this.msg("I couldn't find info about " + stock + " (" + ticker + ")..!");
                    return;
                  }
                  name = fields.name, price = fields.price, symbol = fields.symbol;
                  price = parseFloat(price, 10).toFixed(3);
                  return _this.msg(name + " (" + symbol + ") stock price is at $" + price + " right now");
                }
              });
            };
          })(this)
        }
      }
    };
    return document.body.appendChild(tag);
  },
  time: function(entities) {
    var f, loc, ref1;
    loc = (ref1 = entities.location) != null ? ref1.value : void 0;
    f = (function(_this) {
      return function(d) {
        var da, ref2, ti;
        ref2 = pretty_date(d), da = ref2[0], ti = ref2[1];
        if (loc) {
          return _this.msg("It is " + ti + ", on " + da + " in " + loc);
        } else {
          return _this.msg("It is " + ti + ", on " + da);
        }
      };
    })(this);
    if (!loc) {
      return f(new Date());
    }
    this.msg("The time in " + loc + " is... err.. let me think");
    return $.ajax({
      method: 'GET',
      url: "http://api.geonames.org/searchJSON?q=" + (encodeURIComponent(loc)) + "&username=blandw",
      dataType: 'jsonp',
      error: (function(_this) {
        return function() {
          _this.msg("Something went wrong while locating " + loc + " ;<");
          return console.log(arguments);
        };
      })(this),
      success: (function(_this) {
        return function(data) {
          var lat, lng, name, ref2, ref3, ref4, ref5, ref6, ref7;
          lat = (ref2 = data.geonames) != null ? (ref3 = ref2[0]) != null ? ref3.lat : void 0 : void 0;
          lng = (ref4 = data.geonames) != null ? (ref5 = ref4[0]) != null ? ref5.lng : void 0 : void 0;
          name = (ref6 = data.geonames) != null ? (ref7 = ref6[0]) != null ? ref7.name : void 0 : void 0;
          if (!(lat && lng && name)) {
            return _this.msg("Couldn't find info about " + loc + " ;<");
          }
          return $.ajax({
            type: 'GET',
            url: "http://api.geonames.org/timezoneJSON?lat=" + lat + "&lng=" + lng + "&username=blandw",
            dataType: 'jsonp',
            success: function(data) {
              var M, _x, d, h, m, ref8, time, x, y;
              time = data.time;
              if (!time) {
                return _this.msg("Couldn't find the time in " + loc + " ;<");
              }
              ref8 = time.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/), _x = ref8[0], y = ref8[1], M = ref8[2], d = ref8[3], h = ref8[4], m = ref8[5];
              x = new Date();
              x.setFullYear(y);
              x.setMonth(M - 1);
              x.setDate(d);
              x.setHours(h);
              x.setMinutes(m);
              return f(x);
            }
          });
        };
      })(this)
    });
  },
  thermostat_set: function(entities) {
    var pretty_unit, ref1, ref2, ref3, ref4, temp, unit;
    temp = (ref1 = entities.temperature) != null ? (ref2 = ref1.value) != null ? ref2.temperature : void 0 : void 0;
    if (!temp) {
      this.msg("What temperature would you like?");
      return;
    }
    temp %= 100;
    unit = (ref3 = entities.temperature) != null ? (ref4 = ref3.value) != null ? ref4.unit : void 0 : void 0;
    pretty_unit = !unit ? '' : ' ' + unit;
    this.msg("I set the thermostat to " + temp + "°" + pretty_unit);
    this.make_active('nest');
    return this.setState({
      nest_temp: temp,
      nest_unit: unit
    });
  },
  tv_onoff: function(entities) {
    var ch, k, new_val, ref1, ref2;
    k = 'TV';
    this.make_active(k, true);
    new_val = this.on_off(entities, k);
    ch = ((ref1 = entities.tv_channel) != null ? ref1.value : void 0) || ((ref2 = entities.channel) != null ? ref2.value : void 0);
    if (ch === 'cat') {
      ch = 'cats';
    }
    if (new_val === 'on') {
      if (!(ch === 'pebble' || ch === 'cats')) {
        ch = 'pebble';
      }
      this.msg("I set the TV channel to " + ch);
    } else if (new_val === 'off') {
      this.msg("I turned off the TV!");
    }
    return this.setState({
      tv_channel: ch
    });
  },
  water_plants: function(entities) {
    return this.msg("I'm a robot, I can't water things!");
  },
  weather: function(entities) {
    var fetch_weather, loc, ref1, ref2, rel, url;
    loc = entities != null ? (ref1 = entities.location) != null ? ref1.value : void 0 : void 0;
    rel = entities != null ? (ref2 = entities.weather_location_relative) != null ? ref2.value : void 0 : void 0;
    if (!loc && !rel) {
      rel = 'outside';
    }
    fetch_weather = (function(_this) {
      return function(url) {
        _this.msg("Let me fetch the weather for " + loc + "...");
        return $.ajax({
          type: 'GET',
          url: url,
          dataType: 'jsonp',
          error: function() {
            console.log('error', arguments);
            return _this.msg("Something went wrong while fetching weather information...");
          },
          success: function(data) {
            var description, icon, icon_url, main, name, ref3, temp, weather;
            if (_.isArray(data.list)) {
              data = data.list[0];
            } else if (!data.weather) {
              return _this.msg("I couldn't find any weather info for " + loc + "...");
            }
            name = data.name, main = data.main, weather = data.weather;
            temp = main.temp;
            ref3 = weather != null ? weather[0] : void 0, description = ref3.description, icon = ref3.icon;
            icon_url = "http://openweathermap.org/img/w/" + icon + ".png";
            temp = Math.round(temp);
            return _this.msg([
              "It is " + temp + "ºC in " + name + ", with " + description, img({
                src: icon_url
              })
            ]);
          }
        });
      };
    })(this);
    if (rel && rel === 'inside') {
      this.make_active('nest');
      return;
    }
    if (rel && rel === 'outside') {
      loc = 'your location';
      if (!navigator.geolocation) {
        return this.msg("I don't know what your location is");
      } else {
        return navigator.geolocation.getCurrentPosition((function(_this) {
          return function(pos) {
            var latitude, longitude, ref3, url;
            ref3 = pos.coords, latitude = ref3.latitude, longitude = ref3.longitude;
            url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&mode=json";
            return fetch_weather(url);
          };
        })(this));
      }
    } else {
      url = "http://api.openweathermap.org/data/2.5/find?q=" + loc + "&units=metric&mode=json";
      return fetch_weather(url);
    }
  }
});

$(function() {
  return React.renderComponent(Demo({}), document.getElementById('demo'));
});

// ---
// generated by coffee-script 1.9.2
