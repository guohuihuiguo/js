var utils=(function(){
    function getCss(curEle,atr) {
        if(typeof curEle === "undefined" || typeof atr === "undefined"){
            throw new Error("参数不正确");
        }
        var val="";
        if("getComputedStyle" in window){
            val=getComputedStyle(curEle)[atr];
        }else{
            if(atr==="opacity"){
                val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+(?:\.\d))\)$/;
                return reg.test(val)?reg.exec(val)[1]/100:null;
            }else{
                val=curEle.currentStyle[atr];
            }
        }
        return parseFloat(val);
    }

    function setCss(curElr,attr,val) {
        if(attr==="float"){
            curElr.style[attr]=val;
            curElr.style["styleFloat"]=val;
            return;
        }
        if(attr==="opacity"){
            curElr.style[attr]=val;
            curElr.style["fiter"]="alpha(opacity="+val*100+")";
            return;
        }

        var reg=/^(width|height((margin|padding)?(top|bottom|right|left)?)?)$/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val=val+"px";
            }
        }
        curElr.style[attr]=val;
    }

    function setGroup(curElr,options) {
        if(typeof options ==="object"){
            for(var key in options){
                setCss(curElr,key,options[key]);
            }
        }
    }

    function css() {
        var len=arguments.length;
        var curEle=arguments[0];
        var attr,val,options;
        if(len==3){
            attr=arguments[1];
            val=arguments[2];
            setCss(curEle,attr,val);
            return;
        }
        if(len==2){
            if(typeof arguments[1]==="object"){
                options=arguments[1];
                setGroup(curEle,options);
                return;
            }
            attr=arguments[1];
            return getCss(curEle,attr);

        }

    }
    function toListArray(num) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(num);

        } catch (e) {
            for (var i = 0; i < num.length; i++) {
                ary[ary.length] = num[i];
            }
        }
        return ary;
    }
    function toJson(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
    function offset(curEle) {
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var p=curEle.offsetParent;
        while (p){
            if(!/MSIE 8\.0/.test(navigator.userAgent)){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        };
        return {
            l:l,
            t:t
        };
    }
    //
    function win(attr,value) {
        if(typeof value==="undefined"){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
    //获取哥哥节点
    function getBro(pre) {
        if("previousElementSibling" in pre){
            return pre.previousElementSibling;
        }
        var pre=pre.previousSibling;
        while (pre){
            if(pre.nodeType===1){
                return pre;
            }
            pre=pre.previousSibling;
        }
    }
    //获取弟弟节点
    function getBronext(next) {
        if("nextElementSibling" in next){
            return next.nextElementSibling;
        }
        var next=next.nextSibling;
        while (next){
            if(next.nodeType===1){
                return next;
            }
            next=next.nextSibling;
        }
    }
    //获取所有的兄弟的元素节点
    function getAll(curEle) {
        var a=curEle.parentNode.childNodes;
        var ary=[];
        for(var i=0;i<a.length;i++){
            if(curEle!==a[i]&&a[i].nodeType===1){
                ary.push[a[i]]
            }
        }
    }
    //获取所有的哥哥的元素节点
    function getAllBro(curEle) {
        var a=curEle.previousSibling;
        var ary=[];
        while (a){
            if(a.nodeType===1){
                ary.unshift(a);
            }
            a=a.previousSibling
        }
        return ary;
    }
    //获取所有的弟弟的元素节点
    function getAllnext(curEle) {
        var a=curEle.nextSibling;
        var ary=[];
        while (a){
            if(a.nodeType===1){
                ary.push(a);
            }
            a=a.nextSibling
        }
        return ary;
    }
    //获取当前元素在兄弟元素节点中的索引
     function getIndex(curELe) {
         var index=0;
         var a=curELe.previousSibling;
         while (pre){
             if(pre.nodeType===1){
                 index++;
             }
             pre=pre.previousSibling;
         }
         return index;
     }
    return {
        getCss:getCss,
        setCss:setCss,
        setGroup:setGroup,
        css:css,
        toListArray:toListArray,
        toJson:toJson,
        offset:offset,
        win:win,
        getBro:getBro,
        getBronext:getBronext,
        getAll:getAll,
        getAllBro:getAllBro,
        getAllnext:getAllnext,
        getIndex:getIndex

    }
})();

