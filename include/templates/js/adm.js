$(document).ready(function(){
	
$("input, select").change(function(){
    listch();
});
 $(document).on('change', '#file_icon', function(){
  var name = document.getElementById("file_icon").files[0].name;
  var form_data = new FormData();
  var ext = name.split('.').pop().toLowerCase();
  if(jQuery.inArray(ext, ['png','jpg','jpeg']) == -1) 
  {
   alert("Invalid Image File! Only .png, .jpg, .jpeg");
  }
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("file_icon").files[0]);
  var f = document.getElementById("file_icon").files[0];
  var fsize = f.size||f.fileSize;
  if(fsize > 2000000)
  {
   alert("Image File Size is very big");
  }
  else
  {
   form_data.append("file", document.getElementById('file_icon').files[0]);
   $.ajax({
    url:"/?do=/admin&act=imgto64",
    method:"POST",
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend:function(){
    
    },   
    success:function(data)
    {
     $('#pltagid_icon').val(data);
	 $('#img_icon').attr("src",data);
	 $('#img_icon').show();
	 listch();
    }
   });
  }
 });
 $(document).on('change', '#file_background_image', function(){
  var name = document.getElementById("file_background_image").files[0].name;
  var form_data = new FormData();
  var ext = name.split('.').pop().toLowerCase();
  if(jQuery.inArray(ext, ['png','jpg','jpeg']) == -1) 
  {
   alert("Invalid Image File! Only .png, .jpg, .jpeg");
  }
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("file_background_image").files[0]);
  var f = document.getElementById("file_background_image").files[0];
  var fsize = f.size||f.fileSize;
  if(fsize > 2000000)
  {
   alert("Image File Size is very big");
  }
  else
  {
   form_data.append("file", document.getElementById('file_background_image').files[0]);
   $.ajax({
    url:"/?do=/admin&act=imgtofon",
    method:"POST",
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend:function(){
    
    },   
    success:function(data)
    {
     $('#pltagid_background_image').val(data);
	listch();
    }
   });
  }
 }); 
 
 
});
function applico(){
	  $(document).on('change', '#file_ch', function(){
  var name = document.getElementById("file_ch").files[0].name;
  var form_data = new FormData();
  var ext = name.split('.').pop().toLowerCase();
  if(jQuery.inArray(ext, ['png','jpg','jpeg']) == -1) 
  {
   alert("Invalid Image File! Only .png, .jpg, .jpeg");
  }
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("file_ch").files[0]);
  var f = document.getElementById("file_ch").files[0];
  var fsize = f.size||f.fileSize;
  if(fsize > 2000000)
  {
   alert("Image File Size is very big");
  }
  else
  {
   form_data.append("file", document.getElementById('file_ch').files[0]);
   $.ajax({
    url:"/?do=/admin&act=imgto64",
    method:"POST",
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend:function(){
    
    },   
    success:function(data)
    {
     $('#chtagid_logo_30x30').val(data);
	 $('#img_ch').attr("src",data);
	 $('#img_ch').show();
    }
   });
  }
 });
}
var channels=[],select=0;
function addch(){
	var n=0;
	for(var i=0;i < channels.length;i++) if(channels[i]["type"]!="menu") n++;
	var elem={};
	for(var i=0;i < chtag.length;i++) elem[chtag[i]]="";
	elem["title"]="Новая ссылка "+(n+1);
	channels.push(elem);
	listch();
}
function addmenu(v){
	var n=0;
	for(var i=0;i < channels.length;i++) if(channels[i]["type"]=="menu") n++;
	var elem={};
	for(var i=0;i < chtag.length;i++) elem[chtag[i]]="";
	if(v==null) v="Меню "+(n+1)+"|";
	v=v.split("|");
	elem["title"]=v[0];
	elem["playlist_url"]=v[1];
	elem["type"]="menu";
	channels.push(elem);
	listch();
}

function listch(){
	$('#contents').css("max-height","none");
	var html="<div id='cont'>";
	var menu="";
	var n=0;
	for(var i=0;i < channelsmenu.length;i++){
		menu+="<div style='float:left;font-size:16px; text-align:left;margin-top: 3px;margin-left:5px;' onclick=\"edit("+i+");\">"+'<img style="padding-right: 4px;" align="left" id="img'+i+'" src="'+channelsmenu[i]["logo_30x30"]+'" onerror="this.style.display=\'none\';" width="20" height="15" /> '+channelsmenu[i]["title"]+"</div>";

	}
	for(var i=0;i < channels.length;i++) {
		html+=renderCh(channels[i],i);
	}
	
	if(0){
	if($('[name=pltag\\[typeList\\]]:checked').val()=="start"){
		html+="<br><br>";
		if($("#pltag_before")!=null) html+=$("#pltag_before").htmlarea('html').replace("<span></span>","")+"<br><center>";
		for(var i=0;i < channels.length;i++) {
			
			html+='<div title="'+channels[i]["playlist_url"]+channels[i]["stream_url"]+'" id="ch'+i+'" onmouseover="select='+i+';ch_over();" onclick="edit('+i+');" style="border: 3px solid red; height: 79px; width: 91px; position:relative; margin: 3px 4px; display: inline-block; overflow: hidden; text-align: center;"><img alt="'+channels[i]["logo_30x30"]+'" onerror="this.onerror=null;this.src=\'/templates/images/nologo.png\';" id="img'+i+'" src="'+channels[i]["logo_30x30"]+'" style="position:relative;height:75px;width:89px;padding:2px;"><div style="z-index: 0; position: relative; top: -35px; width: 85px; left: 3px; font-size: 14px; height: 34px; overflow: hidden; color: white; line-height: 0.9; padding-top: 3px; margin-left: 0px;">'+channels[i]["title"]+'</div></div>';
		}
		
		html+="<div id='ch"+i+"' onmouseover=\"select="+i+";ch_over();\" style='border: 3px solid red; height: 115px; width: 135px;position:relative; margin: 3px 4px; display: inline-block; overflow: hidden; text-align: center;' onclick=\"addch();\">Добавить новую ссылку!</div></center>";
	}
	else{
		html+="<div id='infoList' style='float:right;text-align:left;width:550px;overflow:hidden;height:600px;' onclick=\"addch();\"></div>";
		for(var i=0;i < channels.length;i++) {
			if(channels[n]["stream_url"]=="description"||channels[n]["playlist_url"]=="description") u=channels[i]["playlist_url"]+channels[i]["stream_url"];
			else if($("#encrypt").prop( "checked")&&channels[i]["stream_url"]!="") var u="&iu="+i;
			else u=channels[i]["playlist_url"]+channels[i]["stream_url"];
			html+="<div id='ch"+i+"' onmouseover=\"select="+i+";ch_over();\" style='width:260px;text-align:left;margin-top: 3px;' onclick=\"edit("+i+");\"><div style='float:left;padding-top:2px;width:30px;text-align:center;'>"+(++n)+"</div>"+'<img style="padding-right: 4px;" align="left" id="img'+i+'" src="'+channels[i]["logo_30x30"]+'" onerror="this.onerror=null;this.src=\'/templates/images/nologo.png\';" width="30" height="25" /><div id="titleid2" style="white-space:nowrap;height:35px;"><div style="height:23px;font-size:23px;">'+channels[i]["title"]+'</div><div style="padding-left:3px;color: #36e80c;height:12px;font-size:11px;">'+u+'</div></div> </div>';
		}
		if(menu!="") menu+="<div style='clear:both;'></div>";
		html+="<div id='ch"+i+"' onmouseover=\"select="+i+";ch_over();\" style='text-align:left;margin-top: 3px;' onclick=\"addch();\">Добавить новую ссылку!</div>";
		//menu+="<div style='margin-left:5px;float:left;font-size:16px; text-align:left;margin-top: 3px;' onclick=\"addmenu();\">Добавить Меню </div>";
	}
	}
	html+="</div>";
	
	$("#ch").html("<div style='overflow:hidden;font-size:20px;color: #000;    opacity: 0.7;    word-break: break-all;    float: left;    padding-top: 2px;    margin: 0px;    border-right: 1px solid #6f6f6f;    height: 24px;    width: 230px;    background-color: #e0e0e0;'><img id='imginset' width='23' height='21' style='float: left;padding-left:4px;padding-left:4px;display:block;' onerror='this.display=\'none\';' src='"+$("#pltagid_icon").val()+"'><div style='background-color:transparent;margin-left:3px;margin-right:2px;height:32px;'>"+$("#pltagid_title").val()+"</div></div><br clear='both'>"+menu+html);
	$('#ch').css("background",'url('+$('#pltagid_background_image').val()+') 0px 34px');
	$('#ch').css("color",$('#pltagid_color').val());
	
	
	linkOver(0);
	
}
var img_dir="/templates/images";
function css_wh(n){
	return Math.ceil(0.66*n);
}
function css_w(n){
	return Math.ceil(0.66*n);
}
function getimg(n){
	return n;
}
var adop="",ncc=0,sPos={},sPosX=0,sPosY=0,Main={},box_low2=0,hideRight=0,is_iptv=0,ch_height=37;
var ch_padding=4;
var ch_size=29;;
function renderCh(Ch,index){
	var html="",count=channels.length; Main['typeList']=$('[name=pltag\\[typeList\\]]:checked').val()
	if(hideRight) var widthCh=css_w(1195);
	else if(is_iptv>2) widthCh=css_w(790);
	else widthCh=css_w(610);
	var backgrOp="background: rgba(0,0,0,0.4);";
	
	if(Ch["playlist_url"] !="") var onerror="this.onerror=null;this.src='"+img_dir+"/open.png';";
	else onerror="this.onerror=null;this.src='"+img_dir+"/file.png';";
	Ch["imgsrc"]=getimg(Ch["logo_30x30"]);
	if(Main.typeList=="start"){	
				
		if(( ncc&&(index-ncc>23||(count-ncc>32&&index-ncc>15)||(count-ncc>40&&index-ncc>7)||(count-ncc>48&&index-ncc>-1)) )||
			index>31||(count>40&&index>23)||(count>48&&index>15)||(count>56&&index>7)) {
			var st_h=css_wh(60);
			var st_w=css_w(85);
			var el_mini=true;
			var el_margin=1;
		}
		else {
			st_h=css_wh(105);
			st_w=css_w(125);	
			el_mini=false;	
			el_margin=css_w(3);	
		}
		
		if(Ch["tvg-shift"]!="98") {
			if(adop!="") {
				sPosY++;
				sPosX=0;
			}
			html+=adop;
			adop="";
		}
		if(Ch["tvg-shift"]=="99"){
			ncc++;
			sPosX=0;
			sPos[index]=[sPosX,sPosY++];
			return '<div id="ch'+index+'" sel="0" onmouseover="if(!this.sel) linkOver('+index+',this);" onmousedown="p_d();" onmouseup="p_u();" onclick="p_c('+index+');" style="border:3px solid transparent;width:'+css_w(1000)+'px;margin:'+css_wh(el_margin)+'px '+css_w(80)+'px;display:inline-block;overflow:hidden;">'+
			'<div id="titleid'+index+'" style="overflow: hidden;height:'+css_wh(28)+'px;color:#2b2525; background-color: #eee;border: 1px solid #e8e8e8;padding:4px;">'+Ch["title"]+'</div>'+
			''+
			'</div><br clear="both">';		
		}
		else if(Ch["tvg-shift"]=="98"){
			ncc++;
			//if(adop=="") html="<div style='margin: "+css_wh(20)+"px 0px 0px "+css_w(150)+"px;float:left;'></div>";
			adop='<br clear="both">';
			sPos[index]=[sPosX++,sPosY];
			return html+'<div id="ch'+index+'" sel="0" onmouseover="if(!this.sel) linkOver('+index+',this);" onmousedown="p_d();" onmouseup="p_u();" onclick="p_c('+index+');" style="position:relative;border:3px solid transparent;margin:'+css_w(0)+'px '+css_wh(4)+'px;display:inline-block;overflow:hidden;">'+
			'<img alt="'+Ch["title"]+'" onerror="'+onerror+'" id="img'+index+'" src="'+Ch["imgsrc"]+'" style="float:left;height:'+css_wh(22)+'px;padding-top:'+css_wh(8)+'px;">'+
			'<div id="titleid'+index+'" style="overflow: hidden;max-width: '+css_w(310)+'px;float:left;height:'+css_wh(24)+'px; padding:4px;text-decoration: underline;">'+Ch["title"]+'</div>'+
			''+
			'</div>';			
		}
		
		
		if(sPosX>=startX) {
			sPosY++;
			sPosX=0;
		}
		sPos[index]=[sPosX++,sPosY];
		html+=adop+'<div id="ch'+index+'" sel="0" onmouseover="if(!this.sel) linkOver('+index+',this);" onmousedown="p_d();" onmouseup="p_u();" onclick="p_c('+index+');" style="position: relative;border:3px solid transparent;text-align:center;height:'+st_h+'px;width:'+css_w(135)+'px;margin-top:'+css_wh(el_margin)+'px; margin-left:'+css_w(4)+'px;display: inline-block;overflow:hidden;text-align:center;">';
		html+="<div id='rat"+index+"' style='position:absolute;display:none;text-align:left;height:"+css_wh(23)+"px;width:"+css_w(28)+"px;padding-top: "+css_wh(5)+"px;padding-left: "+css_w(5)+"px;font-size:"+css_wh(11)+"px;'></div>";
		if( (Ch["menu_url"]=="2"||Ch["tvg-shift"]=="1"|| (Ch["tvg-shift"]!="0"&&!is_start()) ) &&Ch["title"] !=" "&&Ch["title"] !="") html+='<div style="position:absolute;margin-top:'+(st_h-css_wh(35))+'px; width: '+css_w(129)+'px; '+backgrOp+'font-size:'+css_wh(19)+'px;height:'+css_wh(34)+'px;overflow:hidden;color:white;line-height: 0.9;" id="titleid'+index+'">'+Ch["title"]+'</div>';
	
		html+='<img alt="'+Ch["title"]+'" onerror="'+onerror+'" id="img'+index+'" src="'+Ch["imgsrc"]+'" style="height:'+(st_h-4)+'px;width:'+(st_w)+'px;padding:2px;">';
		if(!box_low2&&typeof Ch["side_icon"]!="undefined") if(Ch["side_icon"]!="") html+='<img align="left" src="'+getsrcimg(Ch["side_icon"])+'" style="top:-'+st_h+'px;position:relative;height:'+(st_h-4)+'px;width:'+(st_w)+'px;padding:2px;">';
	
		//''+d_img+dop_new+z-index:'+imgz+';
		html+='</div>';	
		return html;
	}
	var num=(index+1);
	if(typeof Ch["orig_num"]!="undefined") num=(1+Ch["orig_num"]);

	var img='';	
	if(typeof Ch["logo_search"]!="undefined") {
		Ch["imgsrc"]=getimg(Ch["logo_search"]);
	}
	var dspnum='';
	if(Ch["imgsrc"]=="hidden") {img='';dspnum='display:none;';}
	else if(!box_low2) img='<img style="margin: '+css_wh(2)+'px;padding-right: '+css_w(2)+'px;" align="left" id="img'+index+'" src="'+Ch["imgsrc"]+'" onerror="'+onerror+'" width="'+Math.round(ch_height*1.2*(css_w(100)/css_wh(100)))+'" height="'+(ch_height-css_wh(4))+'">';	
	else if(Ch["imgsrc"].indexOf("open.png")>0||Ch["imgsrc"].indexOf("1px.png")>0||Ch["imgsrc"].indexOf("file.png")>0||Ch["imgsrc"].indexOf("search.png")>0) img='';

	var html='<div id="ch'+index+'" sel="0" onmouseover="linkOver('+index+',this);" onmousedown="p_d();" onmouseup="p_u();" onclick="p_c('+index+');" style="border-radius:'+css_w(4)+'px;cursor: default;margin: 2px 0px;width: '+widthCh+'px;overflow:hidden;text-overflow: ellipsis;height:'+ch_height+'px;">'+
	'<div id="numch'+index+'" style="float:left;padding-top:0px;width:'+css_w(38)+'px;text-align:center;'+dspnum+'">'+num+'</div>'+img+
	'';

	if(Ch["infolink"]!=""&&Ch["infolink"]!=" "){
		var ttl='<div style="height:'+Math.ceil(ch_height*0.65)+'px;font-size:'+Math.ceil(ch_height*0.65)+'px;">'+Ch["title"]+'</div>'+
			'<div style="margin-top:'+css_wh(ch_height*-0.08)+'px;padding-left:3px;height:'+Math.ceil(ch_height*0.32)+'px;font-size:'+Math.ceil(ch_height*0.37)+'px;">'+Ch["infolink"]+'</div>';
	}
	else ttl=Ch["title"];
	if(Ch["stream_url"]=="")  html+="<div id='rat"+index+"' style='position:absolute;margin-left: "+(widthCh-css_w(31))+"px;display:none;float:left;padding-top:1px;padding-left:4px;font-size:"+(ch_size*(css_wh(100)/css_w(100))-css_wh(13))+"px;width:"+css_w(31)+"px;'></div>";

	if(!box_low2) html+="<div id='contmenu"+index+"' style='border-radius:"+css_w(4)+"px;height:"+ch_height+"px;width:"+(ch_height-5)+"px;position:absolute;display:none;margin-left: "+(widthCh-4)+"px;'><img onclick=\"getClickInfo('menu',VK_RED);\" src='"+"http://obovse.ru/smarttv/img/menu2.png?ndate190223_"+"' style='height:"+ch_height+"px;width:"+(ch_height-5)+"px;' /></div>";

	html+='<div style="overflow:hidden;padding:'+css_wh(0)+'px 2px 0px '+css_wh(0)+'px;" id="title'+index+'"><div id="titleid'+index+'" style="width:100%;float:left;white-space:nowrap;height:'+ch_height+'px;">'+ttl+'</div>';
		html+='</div></div>';
	return html;
}
function p_c(i){
	edit(i);
}
function linkOver(ind,t){
	console.log("linkOver "+ind);
	select=ind;
	if($("#edit").css('display')!="none") return;
	for(var i=0;i <= channels.length;i++){
		if(i==select) {
			markselect(i,1,t);
			var s=$("#pltagid_chbkg").val()+Math.ceil(255*($("#pltagid_chbkgrange").val()/1)).toString(16);
			$("#ch"+i).css("background","none "+s);
			$("#ch"+i).css("color",$("#pltagid_chcolor").val());
			
		}
		else  {			
			$("#ch"+i).css("border","1px solid transparent");
			markselect(i,0);
		}
	}
	if(channels[select]["description"]=="") var d=channels[select]["title"];
	else d=channels[select]["description"];
	$("#infoList").css("margin-top",select*30);
	$("#infoList").html(d);
	$("#infoList").show();
}
function markselect(id,m,el){
	//console.log("markselect "+id);
	$_("ch"+id).sel=m;
	if(Main.typeList!="start"){
		if(m){
			$_("ch"+id).style.background="none rgba(180, 180, 180, 0.8)";
			$_("ch"+id).style.color="black";
			$_('contmenu'+id).style.display='block';
			$_('contmenu'+id).style.background=$_('ch'+id).style.background;			
		}
		else{
			$_("ch"+id).style.color=$_("ch").style.color;
			$_('contmenu'+id).style.display='none';
			$_("ch"+id).style.background="none";					
		}
		$_('titleid'+id).style.marginLeft="0px";
	}
	else{
		if(m){
			$_("ch"+id).style.borderColor="red";
		}
		else{
			$_("ch"+id).style.borderColor="transparent";
		}		
	}
	if(m){
		setStyles("ch"+id,"channels|parent|selected");
		setStyles("numch"+id,"channels|chnumber|selected");
		setStyles("contmenu"+id,"channels|contmenu|selected");
	}
	else {
		setStyles("ch"+id,"channels|parent|default");
		setStyles("numch"+id,"channels|chnumber|default");
	}
}
var nedit=null;
function edit(n){
	nedit=n;
	var ch=channels[n];
	if(n==-1) {
		ch={};
		for(var i=0;i < chtag.length;i++) ch[chtag[i]]="";
	}
	var html="";
	if($('[name=pltag\\[typeList\\]]:checked').val()=="start") $("#cont").css("visibility","hidden");
	else $("#infoList").hide();
	html+="<div style='float:right;color:rgb(238, 238, 238);'>"+chtag[4]+"<br><textarea rows=25 cols=60 style='' id='chtagid_"+chtag[4]+"' name='chtag["+chtag[4]+"]'>"+ch[chtag[4]]+"</textarea></div><div style='width:320px;background-color:white;padding:3px;'>";
	if(n==-1) html+="<b>Добавление пункта меню </b><br>";
	else html+="<b>Редактирование элемента </b>#"+(n+1)+"<br>";
	for(var i=0;i < chtag.length&&i<2;i++) {
		if(chtag[i]!="description") {
			html+=chtag[i]+"<br>";
			if(chtag[i]=="logo_30x30") html+="<img align='left' src='"+ch[chtag[i]]+"' onerror=\"this.style.display='none'\" id='img_ch' width=20 height=18 />";
			html+="<input style='width:310px;' id='chtagid_"+chtag[i]+"' name='chtag["+chtag[i]+"]' value='"+ch[chtag[i]]+"' />";
			if(chtag[i]=="logo_30x30") html+=" <input type=\"file\" id=\"file_ch\" alt='ico' />";
			html+="<br>";
		}
	}
	html+="Ссылка на <input type='radio' checked='true' name='set_url' value='playlist_url' onclick=\"$('#chtagid_url').show();\" />страницу <input id='str' type='radio' name='set_url' value='stream_url' onclick=\"$('#chtagid_url').show();\" /> видео  <span title='Текст (с HTML оформлением) писать в description!'><input type='radio' name='set_url' value='description' onclick=\"$('#chtagid_url').hide();\" /> текст</span><br><input style='width:310px;' id='chtagid_url' name='chtagurl' value='"+ch["playlist_url"]+ch["stream_url"]+"' /><br>";
	html+="<a href=\"javascript:if($('#alltags').css('display')=='block') $('#alltags').hide(); else $('#alltags').show();\">Показать все теги</a><br>";
	html+="<div id='alltags' style='display:none';>";
	for(var i=5;i < chtag.length;i++) {
		html+=chtag[i]+"<br>";
		html+="<input style='width:310px;' id='chtagid_"+chtag[i]+"' name='chtag["+chtag[i]+"]' value='"+ch[chtag[i]]+"' />";
	}
	html+="</div>";
	html+="<input type='button' onclick=\"save_edit(); \" value='OK' /> <input type='button' onclick=\"del_edit(); \" value='Удалить' />";
	html+="<div>";
	$("#edit").html(html);
	applico();
	if(ch["stream_url"]=="description"||ch["playlist_url"]=="description") {
		$('[name=set_url]').val(['description']);
		$("#chtagid_url").hide();
	}
	else if(ch["stream_url"]!="") $('[name=set_url]').val(['stream_url']);
	$("#edit").css("top",$('#ch'+nedit).offset().top-150);
	$("#edit").show();
	$("#chtagid_description").htmlarea({
                // Override/Specify the Toolbar buttons to show
				css: "/templates/js/jHtml/jHtmlArea.Editor.css",
                toolbar: [
                    ["html","|","bold", "italic", "underline", "|", "forecolor"],
                    ["justifyLeft", "justifyCenter", "justifyRight","p"],
                    ["|", "image"]
                ]}).parent().resizable({ alsoResize: $(this).find("iframe") });
	/*$("#chtagid_description").htmlarea("pasteHTML", ch[chtag[4]]);	*/		 
			
	
}
function show_player(u,is_iptv,t){
	$("#player").css("top",$("#ch"+t).offset().top);
	$("#player").css("left",120);
	$("#player").css("background-color","black");
	var html=''; 
	if((u.indexOf("/serial/")>0&&u.indexOf("/iframe")>0)||(u.indexOf("/video/")>0&&u.indexOf("/iframe")>0)) html='<iframe src="'+u+'" id="moonwalk_video" width="640" height="360" frameborder="0" allowfullscreen></iframe>';
	else if(u.indexOf("youtube.com/watch?v=") > 0 || u.indexOf("youtube.com/embed") > 0 || u.indexOf("youtube.com/video") > 0|| u.indexOf("youtu.be/") > 0) html='<iframe width="640" height="360" src="https://www.youtube.com/embed/'+u.match(/v=(.*)/)[1]+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';	
	else if(!is_iptv&&!u.match(/\.(m3u8)/)) html='<video width="640" height="360" autoplay=true src="'+u+'"></video>';
	else html='<object id="video_flash_api" class="vjs-tech" width="640" height="369" name="video_flash_api" data="/templates/js/GrindPlayer.swf" type="application/x-shockwave-flash" style="display: block;    background-color: #000;clear:both;">'+
'<param value="plugin_hls=templates%2Fjs%2FflashlsOSMF.swf&readyFunction=videojs.Flash.onReady&eventProxyFunction=videojs.Flash.onEvent&errorEventProxyFunction=videojs.Flash.onError&autoplay=true&preload=undefined&loop=undefined&muted=undefined&hls_debug=true&hls_capleveltostage=true&src='+encodeURIComponent(u)+'&" name="flashvars">'+
'<param value="always" name="allowScriptAccess"><param value="all" name="allowNetworking"><param value="transparent" name="wmode"><param value="#000000" name="bgcolor"></object>';
	 $("#player").html('<div style="background-color:black;float:right;color:white;"><a onclick="$(\'#player\').html(\'\');$(\'#player\').hide();">Закрыть</a></div>'+html);
	$("#player").show();
	
}
function del_edit(){
	channels.splice(nedit,1);
	$('#edit').hide();
	listch();
}
function save_edit(){
	var n=nedit;
	
	if(n==-1) {channels[n]={};for(var i=0;i < chtag.length;i++) channels[n][chtag[i]]="";	}
	
	for(var i=0;i < chtag.length;i++){
		if($("#chtagid_"+chtag[i])==null) continue;
		if(chtag[i]=="description") channels[n][chtag[i]]=$("#chtagid_"+chtag[i]).htmlarea('html');
		else channels[n][chtag[i]]=$("#chtagid_"+chtag[i]).val();
	}
	
	if($('[name=set_url]:checked').val()=="description") {
		channels[n]["playlist_url"]="";
		channels[n]["stream_url"]="description";
	}
	else if($('[name=set_url]:checked').val()=="stream_url") {
		channels[n]["playlist_url"]="";
		channels[n]["stream_url"]=$("#chtagid_url").val();
	}
	else {		
		channels[n]["playlist_url"]=$("#chtagid_url").val();
		channels[n]["stream_url"]="";
	}
	$("#userlink").val(JSON.stringify(channels[n]));
	$("#userlink").prop("type","text");
	$("#userlink").after( " "+channels[n]["title"]+"<br>");
	if(n==-1){
		delete channels[n];
		$('#ch-1').hide();
	}
	$('#edit').hide();
	listch(); 
}
function upload_page(){
	for(var i=0;i < channels.length;i++){
		for(var j=0;j < chtag.length;j++) if(channels[i][chtag[j]]=="") delete channels[i][chtag[j]];
	}
	$("#pl_channels").val(JSON.stringify(channels));
	$("#formxml").submit();
}

function OpenUrl(url){
	document.location=url;
}
function OpenGoBack(){
	history.back();
}
function ConfirmMessage(s,func){
	if(func!=null) {
		if(confirm(s)) func.apply(this);
	}
	else confirm(s);
}

function applyStyles(st){
	for(var i in st["cssid"]) setStyles(i,"cssid|"+i,st);
}
function $_(id){
	return document.getElementById(id);
}
function setStyles(id,styles,arraySt){
	if(typeof arraySt!="undefined"&&arraySt!=null&&$_(id)!=null){		
		var st=styles.split("|");
		if(arraySt!=null){
			if(typeof arraySt[st[0]]!="undefined"&&arraySt[st[0]]!=null){
				if(st.length>1){
					var el=st.shift();
					return setStyles(id,st.join("|"),arraySt[el]);
				}
				else{
					for(var i in arraySt[st[0]]){
						$_(id).style[i]=arraySt[st[0]][i];
					}
				}
			}
		}
	}
}













