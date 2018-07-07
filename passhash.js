var state = {
  seed: "",
  key: "",
  len: 32,
  hash: "",
  setSeed: function(v) {
    state.seed = v;
  },
  setKey: function(v) {
    state.key = v;
  },
  setLen: function(v) {
    state.len = parseInt(v, 10);
  },
  toHash: function() {
    state.hash = blake2b.blake2bHex(state.seed, state.key, state.len / 2);
  }
};

var Component = {
  view: function() {
    return [
      m("h1", "PassHash"),
      m("div", [
        "Seed: ",
        m("input", {
          type: "password",
          size: "50",
          oninput: m.withAttr("value", state.setSeed),
          value: state.seed
        })
      ]),
      m("div", [
        "Keys: ",
        m("input", {
          type: "text",
          size: "50",
          oninput: m.withAttr("value", state.setKey),
          value: state.key
        })
      ]),
      m("div", [
        "Length: ",
        m(
          "select",
          {
            onchange: m.withAttr("value", state.setLen)
          },
          [8, 16, 32, 64].map(function(v) {
            return m("option", { value: v, selected: state.len == v }, v);
          })
        )
      ]),
      m("input", {
        type: "button",
        onclick: state.toHash,
        value: "Submit"
      }),
      m("div", state.hash)
    ];
  }
};

m.mount(document.body, Component);
