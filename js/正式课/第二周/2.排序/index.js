//获取数据，通过Ajax获取后台数据
//第一步创建Ajax对象
var data;
var xhr = new XMLHttpRequest();
//2.打开相应的文件路径
xhr.open("get", "product.json", false);
//3. 监听
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        // console.log(xhr.responseText);
        data = utils.toJson(xhr.responseText);
    }
};
//4.发送请求
xhr.send(null);
// console.log(data);

//数据绑定
var oUl = document.getElementById("list");
var str = "";
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str += "<li data-time='" + cur.time + "' data-hot='" + cur.hot + "' data-price='" + cur.price + "'>"
    str += "<img src='" + cur.img + "'>"
    str += "<span>" + cur.time + "</span>"
    str += "<span>" + cur.hot + "</span>"
    str += "<span>$" + cur.price + "</span>"
    str += "</li>";
}
oUl.innerHTML = str;

//绑定事件
var menu = document.getElementById("menu");
var likeA = menu.getElementsByTagName("a");
for (var i = 0; i < likeA.length; i++) {
    //likeA[i].index=i;
    // likeA[i].count=-1;
    // likeA[i].onclick = function () {
    //         this.count*=-1;
    //        sortList.call(this);
    //
    // }

    likeA[i].onclick = (function (j) {
        var count = 0;
        return function () {
            count += 1;
            // console.log(count);
            sortList(j, count);
        }
    })(i);

}
//获取所有的li
// debugger;//让js代码停在这一行，F10是执行下一行，F8跳到下一个断点；
var oLis = oUl.getElementsByTagName("li");
var ary = utils.toListArray(oLis);
// function sortList() {
//     var dataAry = ["data-time","data-hot","data-price"];
//     var that=this;
//     ary.sort(function (a,b) {
//         console.log(a.getAttribute);
//         var cur=a.getAttribute(dataAry[that.index]);
//         var nex=b.getAttribute(dataAry[that.index]);
//         cur=cur.replace(/-/g,"");
//         nex=nex.replace(/-/g,"");
//         // return (cur-nex)*that.count;
//     });
//     //创建文档碎片，只引发一次回流
//     var frg =document.createDocumentFragment();
//     for(var i=0;i<ary.length;i++){
//         frg.appendChild(ary[i]);
//     }
//     oUl.appendChild(frg);
//     frg =null;
// }
function sortList(j, count) {
    var dataAry = ["data-time", "data-hot", "data-price"];
    // console.log(count);
    // debugger
    ary.sort(function (a, b) {
        // console.log(a.getAttribute);
        var cur = a.getAttribute(dataAry[j]);
        var nex = b.getAttribute(dataAry[j]);
        cur = cur.replace(/-/g, "");
        nex = nex.replace(/-/g, "");
        if (count % 2 === 0) {
            return cur - nex;
        } else {
            return nex - cur;
        }
    });
    //创建文档碎片，只引发一次回流
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    oUl.appendChild(frg);
    frg = null;
}