     //-----------------------------------------------------------------------------

     // ������ ��, �� ���� ����

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.trim = function() {

         return this.replace(/(^\\s*)|(\\s*$)/g, "");

     }

     //-----------------------------------------------------------------------------

     // ������ �� ���� ����

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.ltrim = function() {

         return this.replace(/(^\\s*)/, "");

     }

     //-----------------------------------------------------------------------------

     // ������ �� ���� ����

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.rtrim = function() {

         return this.replace(/(\\s*$)/, "");    

     }

     //-----------------------------------------------------------------------------

     // ���ڿ��� byte ���� ��ȯ

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

     // ���ڸ� ���� ����

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.num = function() {

         return (this.trim().replace(/[^0-9]/g, ""));

     }

     //-----------------------------------------------------------------------------

     // ���ڿ� 3�ڸ����� , �� �� ��ȯ

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

     // ���� Ȯ���ڸ� ��������

     // @return : String

     //-----------------------------------------------------------------------------

     String.prototype.ext = function() {

         return (this.indexOf(".") < 0) ? "" : this.substring(this.lastIndexOf(".") + 1, this.length);    

     }

     //-----------------------------------------------------------------------------

     // URL���� �Ķ���� ������ ������ url ���

     // @return : String

     //-----------------------------------------------------------------------------    

     String.prototype.uri = function() {

         var arr = this.split("?");

         arr = arr[0].split("#");

         return arr[0];    

     }
     
//-----------------------------------------------------------------------------

     // �����̳� ������ Ȯ��

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

     // ���ڷ� �����Ǿ� �ִ��� ����

     // arguments[0] : ����� ���ڼ�

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isNum = function() {

         return (/^[0-9]+$/).test(this.remove(arguments[0])) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // ��� ��� - arguments[0] : �߰� ����� ���ڵ�

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isEng = function() {

         return (/^[a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // ���ڿ� ��� ��� - arguments[0] : �߰� ����� ���ڵ�

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isEngNum = function() {

         return (/^[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;

     }

     //-----------------------------------------------------------------------------

     // ���ڿ� ��� ��� - arguments[0] : �߰� ����� ���ڵ�

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isNumEng = function() {

         return this.isEngNum(arguments[0]);

     }

     //-----------------------------------------------------------------------------

     // ���̵� üũ ����� ���ڸ� üũ ù���ڴ� ����� ���� - arguments[0] : �߰� ����� ���ڵ�

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isUserid = function() {

         return (/^[a-zA-z]{1}[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;

     }
     
      //-----------------------------------------------------------------------------

     // �ֹι�ȣ üũ - arguments[0] : �ֹι�ȣ ������

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

         // ������� üũ

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

     // �ܱ��� ��Ϲ�ȣ üũ - arguments[0] : ��Ϲ�ȣ ������

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

         // ������� üũ

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

     // ����ڹ�ȣ üũ - arguments[0] : ��Ϲ�ȣ ������

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

     // ���� ��Ϲ�ȣ üũ - arguments[0] : ��Ϲ�ȣ ������

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

     // �̸����� ��ȿ���� üũ

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isEmail = function() {

         return (/\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.[a-zA-Z]{2,4}$/).test(this.trim());

     }

     //-----------------------------------------------------------------------------

     // ��ȭ��ȣ üũ - arguments[0] : ��ȭ��ȣ ������

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isPhone = function() {

         var arg = arguments[0] ? arguments[0] : "";

         return eval("(/(02|0[3-9]{1}[0-9]{1})" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");

     }

     //-----------------------------------------------------------------------------

     // �ڵ�����ȣ üũ - arguments[0] : �ڵ��� ������

     // @return : boolean

     //-----------------------------------------------------------------------------

     String.prototype.isMobile = function() {

         var arg = arguments[0] ? arguments[0] : "";

         return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");

     }
     
     
     //-----------------------------------------------------------------------------

     // �ѱ�,���� length üũ�ϱ� -  * parameter : obj - �ش� ������Ʈ
 	 //							 * parameter : slength - �ִ���� �Ѱ��ֱ�
     // ��  �� : onblur=getByteLength(this,1000)
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
	     alert(len+" Byte:����"+slength+"�ڸ������� �Է��Ҽ� �ֽ��ϴ�.(�ѱ��� "+hlength+"�� �Է�)");
	     obj.select();
	     return; 
	   } 
	} 
	
 	//-----------------------------------------------------------------------------

     // �迭���� üũ 

     // @return : boolean

     //-----------------------------------------------------------------------------
	function isArray(obj){return(typeof(obj.length)=="undefined")?false:true;}

