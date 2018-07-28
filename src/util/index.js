
//获取url 参数的字段
export const  GetRequest=function(url) {  
    //获取url中"?"符后的字串
     var theRequest = new Object();  
     if (url.indexOf("?") != -1) {  
        var str = url.substr(1);  
        var strs = str.split("&");  
        for(var i = 0; i < strs.length; i ++) {  
           theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
        }  
     }  
     return theRequest;  
  } 

const dateArr=["星期日","星期一","星期二",'星期三','星期四','星期五','星期六']
//获取最近一周的时间
export const getDateArr=function(dayNum){
    var oDate = new Date();   //获取当前时间  
   
    var dayArr = [
        {
            valye:dateArr[oDate.getDay()],
            label:oDate.getFullYear()+'-'+ (oDate.getMonth()+1)+'-'+oDate.getDate(),
            time:new Date()
        }
    ];     //定义一个数组存储所以时间
    for(var i=1;i<dayNum;i++){
        var newDate=new Date(oDate.getTime() + i*24*60*60*1000)



        dayArr.push( {
            valye:dateArr[newDate.getDay()],
            label:newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate(),
            time:newDate
        });   //把未来几天的时间放到数组里
    }
    return dayArr;
}


