var data;
var xhr=new XMLHttpRequest();
xhr.open("get","product.json",false);
xhr.onreadystatechange = function () {

    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
        // console.log(xhr.responseText);

        data=utils.toJson(xhr.responseText);
    }
};
xhr.send(null);

var oUl=document.getElementById("list");
var str="";
for(var i=0;i<data.length;i++){
    var cur=data[i];
    str +="<li data-time='"+cur.time+"' data-hot='"+cur.hot+"' data-price='"+cur.price+"'>"
    str +="<img src='"+cur.img+"'>"
    str+="<span>"+cur.title+"</span>"
    str+="<span>"+cur.time+"</span>"
    str+="<span>"+cur.hot+"</span>"
    str+="<span>$"+cur.price+"</span>"
    str+="</li>";
}
oUl.innerHTML=str;

var oMenu = document.getElementById("menu");
var oAs = oMenu.getElementsByTagName("a");
for(var i=0;i<oAs.length;i++){
    oAs[i].index =i;
    oAs[i].count = -1;
    oAs[i].onclick=function () {
        this.count*=-1;
        sortChange.call(this);
    }
}
var oLis= document.getElementsByTagName("li");
var ary=utils.toListArray(oLis);
// console.log(ary);

function sortChange() {
    var that = this;
    var dataArray =["data-time","data-hot","data-price"];
   ary.sort(function (a,b) {
       var cur=a.getAttribute(dataArray[that.index]);
       var nex=b.getAttribute(dataArray[that.index]);
       cur=cur.replace(/-/g,"");
       nex=nex.replace(/-/g,"");
       return (cur-nex)*that.count;
   });
    var frg=document.createDocumentFragment();
   for(var i=0;i<ary.length;i++){
       frg.appendChild(ary[i]);
   }
   oUl.appendChild(frg);
    frg = null;

}