jquery inplace editor
=====================

A very use full jquery inplace editor that supports text input select input and ajax. Inplace editor currently supports 2 types of elements
textarea and select.

Features
=========
* Simple to use
* Ajax update
* Validation support
* jquery data table Support http://datatables.net
* All IE version support
* All Web browser Supported  

Simple Examples

```javascript
//this will convert the element with content-1 Id to an inplace editor you can user Any JQuary selectors  
$('#content-1').inPlaceEditor();
$('#content-1').inPlaceEditor({
	type:'select',//how to edit the content. supported values textarea,select
	event:'click',// Which mouse event to bind with. Supported click,dblclick default dblclick
	hoverClass:'edit',//which class to add to the element when mouse over default "edit" 
	callback:onUpdate,// callback what to do after updating the value 
	beforeEdit:editBigin,//which function to call before edit 
	mouseOver:onMouseOver,// which function to call when the mouse over the element
	mouseOut:onMouseOut // which function to call when mouse out
});
```
For more examples visit http://www.lonelypx.com
