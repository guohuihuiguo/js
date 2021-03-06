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
        var newReg=/^_?\d+(\.\d+)?(px|em|rem)/;
        return newReg.test(val)?parseFloat(val):val;
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
    return {
        css:css
    }
})();

