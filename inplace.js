/*
* jQuerty inPlaceEditior Plugin
* Copyright (c) 2013 Anil Mathew
*/
(function( $ ){

  $.fn.inPlaceEditor = function( options ) {  

    var settings = {
      'type'         : 'textarea',
      'provider' : {type:'data',data:"<option>null</option>"},
	  'event'     :'dblclick',
	  'hoverClass':'edit',
	  'callback':function(){},
	  'beforeEdit':function(){},
	  'mouseOver':function(){},
	  'mouseOut':function(){}
    };//options end

	 $.fn.inPlaceEditor.isEditing=false;
	var methods={
	
	
	}


    return this.each(function() {   
      if ( options ) { 
        $.extend( settings, options );
      }


       $(this).unbind();
        switch(settings.event)
		{
		case "dblclick":
		  $(this).dblclick(function(target){calc(target.target);});
		  break;
		case "click":
		  $(this).click(function(target){calc(target.target);});
		  break;
		default:
		  $(this).dblclick(function(target){calc(target.target);});
		}
		
		$(this).hover(
			function () {
				if( $.fn.inPlaceEditor.isEditing==false){
				$(this).addClass(settings.hoverClass);
				 settings.mouseOver.apply( this,[{target:this}]);
				}
			},
			function () {
				
				$(this).removeClass(settings.hoverClass);
				if( $.fn.inPlaceEditor.isEditing==false){
				settings.mouseOut.apply( this,[{target:this}]);
				}
			}
		);
		

    });


	
	function calc(t){
	  $this=$(t);
	  lastfocus=$(t);
	  var posd =$this.offset();
	  var theight=$this.height();
	  var twidth=$this.width();
	  var val=$this.html();
	  //var rdata=eval($this.attr("rel"));
	  //alert(rdata);
	  settings.beforeEdit.apply( this,[{val:val,target:lastfocus}]);
	  $.fn.inPlaceEditor.isEditing=true;
	  if(settings.type=='textarea'){
		 var  rpl='<TEXTAREA NAME="" id="tc" onblur="" style="position: absolute;z-index:1000000;top:'+posd.top+'px;left:'+posd.left+'px;width:'+twidth+'px;height:'+theight+'px;border:1px solid black;text-align:center">'+br2nl(val)+'</TEXTAREA>';
	  }

	  if(settings.type=='select'){
		 
		 var rpl='<SELECT NAME="" id="tc" onblur="" style="position: absolute;z-index:1000000;top:'+posd.top+'px;left:'+posd.left+'px;width:'+twidth+'px;height:'+theight+'px;border:1px solid black;text-align:center">';
			rpl +='<option value="'+val+'">'+val+'</option>';
			if(typeof(settings.provider)=='object'){
				
				if(settings.provider.type != "URL"){
					rpl +=settings.provider.data;
				}else{
					//alert(provider.data);
					var spl=settings.provider.data.split("?");
					//alert(spl)
					$.ajax({ 
					  type: "GET", 
					  url: spl[0],
					  data: spl[1], 
					  success: function(msg){ 
						//rpl += msg;
						$("#tc").append(msg);
					  } 
					});
				}
			}
			//alert()
			//if(rdata !=undefined){
			//	if(rdata[0]=="URL"){
			//	}
			//}
			rpl +='</select>';
	  }
	  // add other events here;

			$('body').append(rpl);
			$("#tc").focus();
			 $('#tc').blur(function(target){
			 
					packBack(target.target);
			});//tc blur code
	}


	function nl2br(str) {
	return str.replace (/\n/g, "<br />");
	}

	function br2nl (str) {
	str=str.replace (/\<BR>/g, "\n");// ie compelent
	return str.replace (/\<br ?\/?\>/g, "\n");
	}


	function packBack(t){
		
		var newval=nl2br($("#tc").val());
		lastfocus.html(newval);
		$("#tc").remove();
		settings.callback.apply( this,[{val:newval,target:lastfocus}]);
		 $.fn.inPlaceEditor.isEditing=false;
	}

  };
})( jQuery );
