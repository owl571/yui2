<h2 class="first">The Color Picker Control and the YUI Sam Skin</h2>

<p>YUI controls that support "skinning" generally have two levels of CSS: one that is <em>core to the control and its functioning</em> and another that is <em>purely presentational</em>.  As a rule, you should avoid changes that affect the core CSS for a skinned control; rather, you should modify the presentation of a control by building upon (or replacing) its skin-level CSS. For more information about the skinning of YUI controls, please review <a href="http://developer.yahoo.com/yui/articles/skinning/">our skinning reference article</a> which goes into much more detail about how skins are created and how they operate.</li></p>

<p>The <a href="http://developer.yahoo.com/yui/colorpicker/">Color Picker Control</a> is a skinned control whose CSS is entirely presentational; that is, the Color Picker has no "core" CSS but only a skin-level CSS.  The CSS for the default YUI Sam Skin is displayed below.  To modify the presentation of your Color Picker instance, add rules that override those you see here or use this CSS block as a starting point for creating your own custom Color Picker skin.</p>

<textarea name="code" class="CSS" cols="60" rows="1">/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: <?php echo($yuiCurrentVersion); ?>
*/

.yui-picker-panel {
    background: #e3e3e3;
    border-color: #888;
}

.yui-picker-panel .hd {
	background-color:#ccc;
	font-size:100%;
	line-height:100%;
	border:1px solid #e3e3e3;
	font-weight:bold;
	overflow:hidden;
	padding: 6px;
    color: #000;
}

.yui-picker-panel .bd {
    background: #e8e8e8;
    margin: 1px;
    height: 200px;
}

.yui-picker-panel .ft {
    background: #e8e8e8;
    margin: 1px;
    padding: 1px;
             /*
    text-align: center;
    */
}

.yui-picker {
    position: relative;
}

.yui-picker-hue-thumb { cursor:default; width:18px; height:18px; 
top: -8px;
left: -2px;
    z-index: 9; position:absolute; }
.yui-picker-hue-bg {-moz-outline: none; outline:0px none;
    position:absolute; left:200px; height:183px; width:14px;
    background:url(hue_bg.png) no-repeat; 
    top:4px; 
}

.yui-picker-bg {
    -moz-outline: none; 
    outline:0px none; 
    position:absolute; 
    top:4px;
    left:4px; 
    height:182px; 
    width:182px; 
    background-color:#F00; 
    background-image: url(picker_mask.png);
} 

*html .yui-picker-bg {
    background-image: none;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../build/colorpicker/assets/picker_mask.png', sizingMethod='scale');
}


.yui-picker-mask { position:absolute; z-index: 1; top:0px; left:0px; } 

.yui-picker-thumb { cursor:default; width:11px; height:11px; z-index: 9; position:absolute; 
    top:-4px; left:-4px; }

.yui-picker-swatch { position:absolute; left:240px; top:4px; height:60px;
    width:55px; border:1px solid #888; }
.yui-picker-websafe-swatch { position:absolute; left:304px; top:4px;
    height:24px; width:24px; border:1px solid #888; }

.yui-picker-controls { position:absolute; top: 72px; left:226px; font:1em monospace;}
.yui-picker-controls .hd { background: transparent; border-width: 0px !important;}
.yui-picker-controls .bd { height: 100px; border-width: 0px !important;}
.yui-picker-controls ul {float:left;padding:0 2px 0 0;margin:0}
.yui-picker-controls li {padding:2px;margin:0;list-style:none;}
.yui-picker-controls input { 
    font-size: 0.85em;
    width: 2.4em;
}
.yui-picker-hex-controls { 
    clear: both; 
    padding: 2px;
}
.yui-picker-hex-controls input { 
    width: 4.6em;
}

.yui-picker-controls a {
    font: 1em arial,helvetica,clean,sans-serif;
    display:block;
    *display:inline-block; /* IE */
    padding: 0;
    color: #000;

}</textarea>