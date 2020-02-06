var config = {
  columns:{  // 实时代表着每个柱子上的方块数目
    c1 : [6,5,4,3,2,1],
    c2 : [],
    c3 : [],
  },
  scope:0,
  boxWidht:60, // 基础宽度
  tipSpan:document.getElementsByClassName('tip-span')[0],
  columnsDom : document.getElementsByClassName("columns")[0],
  columnItemsDom : document.getElementsByClassName("item"),
  btnsDom:document.getElementsByClassName('btns')[0],
}
var data = config.columns;
var init = {
  render ,
  bindEvent ,
}
init.render(config.columnItemsDom, config.columns)
init.bindEvent()

// 渲染界面
function render (domArr, boxArr ) {
  config.tipSpan.innerHTML = config.scope;
  for (var j = 0; j < domArr.length; j++) {
    clearDoms(domArr[j]);
    renderOne(domArr[j], boxArr["c" + (j + 1)])
    
  }
  function renderOne (dom, arr) {
    for (var i = 0; i < arr.length; i++) {
      var boxDom = document.createElement('div');
      boxDom.setAttribute('class', 'box');
      boxDom.style.width = (arr[i] * 40 + config.boxWidht) + 'px';
      dom.appendChild(boxDom);
    }
  }
  function clearDoms (dom) {
    dom.innerHTML = '';
  }
}

// 运动
function toMove (moveArr, targetArr) {
  if (isMove(moveArr, targetArr)) {
    var boxNumber = moveArr.pop();
    targetArr.push(boxNumber);
    config.scope += 1;
    init.render(config.columnItemsDom, config.columns)
    isWin()

  }
}

// 判断是否可以移动
function isMove  (moveArr, targetArr) {
  if (targetArr.length === 0) {
      return true;
  }
  return    moveArr[moveArr.length - 1] < targetArr[targetArr.length - 1]; 
}

// 注册事件
  function bindEvent () {
    config.btnsDom.onclick = function (e) {
      e = e || window.event;
      var dom = e.target
      if (dom.dataset.form) {
        var form = dom.dataset.form;
        var to = dom.dataset.to;

        toMove(data['c' + form], data['c' + to])
      };
    }
  }
// 判断胜利
  function isWin() {
   
    if (data.c1.length === 0 && data.c2.length === 0) {
      setTimeout(function () {
        alert('胜利了(＾－＾)V');
      },100) 
    }
  }




