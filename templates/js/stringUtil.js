     //-----------------------------------------------------------------------------

     // 문자의 좌, 우 공백 제거

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.trim = function() {

         return this.replace(/(^\\s*)|(\\s*$)/g, "");

     }

     //-----------------------------------------------------------------------------

     // 문자의 좌 공백 제거

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.ltrim = function() {

         return this.replace(/(^\\s*)/, "");

     }

     //-----------------------------------------------------------------------------

     // 문자의 우 공백 제거

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.rtrim = function() {

         return this.replace(/(\\s*$)/, "");    

     }

     //-----------------------------------------------------------------------------

     // 문자열의 byte 길이 반환

     // @return : int

     //-----------------------------------------------------------------------------

     String.prototype.byte = function() {

         var cnt = 0;

         for (var i = 0; i < this.length; i++) {

             if (this.charCodeAt(i) > 127)

                 cnt += 2;

             else

                 cnt++;

         }

         return cnt;

     }


     //-----------------------------------------------------------------------------

     // 숫자만 가져 오기

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.num = function() {

         return (this.trim().replace(/[^0-9]/g, ""));

     }

     //-----------------------------------------------------------------------------

     // 숫자에 3자리마다 , 를 찍어서 반환

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.money = function() {

         var num = this.trim();

         while((/(-?[0-9]+)([0-9]{3})/).test(num)) {

             num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");

         }

         return num;

     }

     //-----------------------------------------------------------------------------

     // 파일 확장자만 가져오기

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.ext = function() {

         return (this.indexOf(".") < 0) ? "" : this.substring(this.lastIndexOf(".") + 1, this.length);    

     }

     //-----------------------------------------------------------------------------

     // URL에서 파라메터 제거한 순수한 url 얻기

     // @return : String

     //-----------------------------------------------------------------------------    

     String.prototype.uri = function() {

         var arr = this.split("?");

         arr = arr[0].split("#");

         return arr[0];    

     }
     
//-----------------------------------------------------------------------------

     // 공백이나 널인지 확인

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isBlank = function() {

         var str = this.trim();

         for(var i = 0; i < str.length; i++) {

             if ((str.charAt(i) != "\\t") && (str.charAt(i) != "\\n") && (str.charAt(i)!="\\r")) {

                 return false;

             }

         }

         return true;

     }   
          String.prototype.isEmpty = function() {         var str = this.trim();         if(str != null && str.length == 0 && str != undefined) return true;         else return false;     }        
  //-----------------------------------------------------------------------------

     // 숫자로 구성되어 있는지 학인

     // arguments[0] : 허용할 문자셋

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isNum = function() {

         return (/^[0-9]+$/).test(this.remove(arguments[0])) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // 영어만 허용 - arguments[0] : 추가 허용할 문자들

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isEng = function() {

         return (/^[a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // 숫자와 영어만 허용 - arguments[0] : 추가 허용할 문자들

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isEngNum = function() {

         return (/^[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // 숫자와 영어만 허용 - arguments[0] : 추가 허용할 문자들

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isNumEng = function() {

         return this.isEngNum(arguments[0]);

     }

     //-----------------------------------------------------------------------------

     // 아이디 체크 영어와 숫자만 체크 첫글자는 영어로 시작 - arguments[0] : 추가 허용할 문자들

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isUserid = function() {

         return (/^[a-zA-z]{1}[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;

     }
     
      //-----------------------------------------------------------------------------

     // 주민번호 체크 - arguments[0] : 주민번호 구분자

     // XXXXXX-XXXXXXX

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isJumin = function() {

         var arg = arguments[0] ? arguments[0] : "";

         var jumin = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");

         if(jumin == null) {

             return false;

         }

         else {

             jumin = jumin.toString().num().toString();

         }

         // 생년월일 체크

         var birthYY = (parseInt(jumin.charAt(6)) == (1 ||2)) ? "19" : "20";

         birthYY += jumin.substr(0, 2);

         var birthMM = jumin.substr(2, 2) - 1;

         var birthDD = jumin.substr(4, 2);

         var birthDay = new Date(birthYY, birthMM, birthDD);

         if(birthDay.getYear() % 100 != jumin.substr(0,2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {

             return false;

         }        

         var sum = 0;

         var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]

         var last = parseInt(jumin.charAt(12));

         for(var i = 0; i < 12; i++) {

             sum += parseInt(jumin.charAt(i)) * num[i];

         }

         return ((11 - sum % 11) % 10 == last) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // 외국인 등록번호 체크 - arguments[0] : 등록번호 구분자

     // XXXXXX-XXXXXXX

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isForeign = function() {

         var arg = arguments[0] ? arguments[0] : "";

         var jumin = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[5678]{1}[0-9]{1}[02468]{1}[0-9]{2}[6789]{1}[0-9]{1}$/)");

         if(jumin == null) {

             return false;

         }

         else {

             jumin = jumin.toString().num().toString();

         }

         // 생년월일 체크

         var birthYY = (parseInt(jumin.charAt(6)) == (5 || 6)) ? "19" : "20";

         birthYY += jumin.substr(0, 2);

         var birthMM = jumin.substr(2, 2) - 1;

         var birthDD = jumin.substr(4, 2);

         var birthDay = new Date(birthYY, birthMM, birthDD);

         if(birthDay.getYear() % 100 != jumin.substr(0,2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {

             return false;

         }

         if((parseInt(jumin.charAt(7)) * 10 + parseInt(jumin.charAt(8))) % 2 != 0) {

             return false;

         }

         var sum = 0;

         var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]

         var last = parseInt(jumin.charAt(12));

         for(var i = 0; i < 12; i++) {

             sum += parseInt(jumin.charAt(i)) * num[i];

         }

         return (((11 - sum % 11) % 10) + 2 == last) ? true : false;

     }    

     //-----------------------------------------------------------------------------

     // 사업자번호 체크 - arguments[0] : 등록번호 구분자

     // XX-XXX-XXXXX

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isBiznum = function() {

         var arg = arguments[0] ? arguments[0] : "";

         var biznum = eval("this.match(/[0-9]{3}" + arg + "[0-9]{2}" + arg + "[0-9]{5}$/)");

         if(biznum == null) {

             return false;

         }

         else {

             biznum = biznum.toString().num().toString();

         }

         var sum = parseInt(biznum.charAt(0));

         var num = [0, 3, 7, 1, 3, 7, 1, 3];

         for(var i = 1; i < 8; i++) sum += (parseInt(biznum.charAt(i)) * num[i]) % 10;

         sum += Math.floor(parseInt(parseInt(biznum.charAt(8))) * 5 / 10);

         sum += (parseInt(biznum.charAt(8)) * 5) % 10 + parseInt(biznum.charAt(9));

         return (sum % 10 == 0) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // 법인 등록번호 체크 - arguments[0] : 등록번호 구분자

     // XXXXXX-XXXXXXX

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isCorpnum = function() {

         var arg = arguments[0] ? arguments[0] : "";

         var corpnum = eval("this.match(/[0-9]{6}" + arg + "[0-9]{7}$/)");

         if(corpnum == null) {

             return false;

         }

         else {

             corpnum = corpnum.toString().num().toString();

         }

         var sum = 0;

         var num = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]

         var last = parseInt(corpnum.charAt(12));

         for(var i = 0; i < 12; i++) {

             sum += parseInt(corpnum.charAt(i)) * num[i];

         }

         return ((10 - sum % 10) % 10 == last) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // 이메일의 유효성을 체크

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isEmail = function() {

         return (/\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.[a-zA-Z]{2,4}$/).test(this.trim());

     }

     //-----------------------------------------------------------------------------

     // 전화번호 체크 - arguments[0] : 전화번호 구분자

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isPhone = function() {

         var arg = arguments[0] ? arguments[0] : "";

         return eval("(/(02|0[3-9]{1}[0-9]{1})" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");

     }

     //-----------------------------------------------------------------------------

     // 핸드폰번호 체크 - arguments[0] : 핸드폰 구분자

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isMobile = function() {

         var arg = arguments[0] ? arguments[0] : "";

         return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");

     }
     
     
     //-----------------------------------------------------------------------------

     // 한글,영문 length 체크하기 -  * parameter : obj - 해당 오브젝트
 	 //							 * parameter : slength - 최대길이 넘겨주기
     // 적  용 : onblur=getByteLength(this,1000)
     // @return : boolean
	
     //-----------------------------------------------------------------------------     

	function getByteLength(obj,slength){ 
	   var len = 0; 
	   s = obj.value;
	   hlength =  slength/2;
	   if ( s == null ) return ''; 
	   for(var i=0;i<s.length;i++){ 
	      var c = escape(s.charAt(i)); 
	      if ( c.length == 1 ) len ++; 
	      else if ( c.indexOf("%u") != -1 ) len += 2; 
	      else if ( c.indexOf("%") != -1 ) len += c.length/3; 
	   } 
	  
	   if (len > slength) {
	     alert(len+" Byte:영문"+slength+"자리까지만 입력할수 있습니다.(한글은 "+hlength+"자 입력)");
	     obj.select();
	     return; 
	   } 
	} 
	
 	//-----------------------------------------------------------------------------

     // 배열인지 체크 

     // @return : boolean

     //-----------------------------------------------------------------------------
	function isArray(obj){return(typeof(obj.length)=="undefined")?false:true;}

