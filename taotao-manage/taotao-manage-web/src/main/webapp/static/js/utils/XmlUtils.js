/**/ 
function XmlUtils (config) { 
/*定义私有属性*/ 
this.isIE = !!(window.attachEvent && !window.opera); 
this.init(); 
if(config) { 
this.dataType = config.dataType == 'json' ? 'json' : 'array'; 
if(config.xmlPath) this.loadXml(config.xmlPath); 
} 
} 
XmlUtils.prototype = { 
xmlDoc : null, 
xmlPath : null, 
dataType : null, 
/** 
* 初始化 
*/ 
init : function () { 
if (this.isIE) { 
var activexArr = ["MSXML4.DOMDocument", "MSXML3.DOMDocument", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XmlDom"]; 
for(i=0; i<activexArr.length; i++){ 
try{ 
this.xmlDoc = new ActiveXObject(activexArr[i]); 
}catch(e){} 
} 
} else { 
this.xmlDoc = document.implementation.createDocument("", "", null); 
} 
}, 
/** 
* 加载xml文件,参数: 
* @param {string} xmlPath：加载的xml文件路径； 
* @return {Object} true 正常加载； false 加载失败 
*/ 
loadXml : function (xmlPath) { 
try { 
this.xmlDoc.async = false; 
this.xmlDoc.load(xmlPath); 
this.xmlPath = xmlPath; 
return true; 
} catch (e) { 
return false; 
} 
}, 
/** 
* 加载XML字符串 
* @param {Object} XMLString 
*/ 
loadXmlString: function(xmlString) { 
if (this.isIE) { 
this.xmlDoc.loadXML(xmlString); 
} else { 
var parser = new DOMParser(); 
this.XMLDoc = parser.parseFromString(xmlString, "text/xml"); 
} 
}, 
/** 
* 判断节点的是否有子节点 
* @param {Object} node 
* @return {Object} 有子节点则返回true，否则返回false 
*/ 
hasChildNodes : function (node) { 
return node.hasChildNodes(); 
}, 
/** 
* 判断节点的是否有属性 
* @param {Object} node 
* @return {Object} 有属性则返回true，否则返回false 
*/ 
hasAttributes : function (node) { 
return (node.attributes.length > 0) ? true : false; 
}, 
/** 
* 判断节点的是否是文本节点，包括带CDATA区段的文本节点 
* @param {Object} node 
* @return {Object} 是文本节点则返回true，否则返回false 
*/ 
isTextNode : function (node) { 
var type = this.getNodeType(node); 
return (type == 3 || type == 4) ? true : false; 
}, 
/** 
* 返回根节点 
* @return {Object} 根节点 
*/ 
getRoot : function () { 
return this.xmlDoc.documentElement; 
}, 
/** 
* 返回节点的第一个子节点，没有参数则返回根节点的第一个子节点 
* @param {Object} node 
* @return {Object} 节点的第一个子节点 
*/ 
getFirstChild : function (node) { 
return node ? node.firstChild : this.getRoot().firstChild; 
}, 
/** 
* 返回节点的最后子节点，没有参数则返回根节点的第一个子节点 
* @param {Object} node 
* @return {Object} 节点的最后一个子节点 
*/ 
getLastChild : function (node) { 
return node ? node.lastChild : this.getRoot().lastChild; 
}, 
/** 
* 返回节点的下一个节点，没有参数则返回根节点的第一个子节点 
* @param {Object} node 
* @return {Object} 节点的下一个节点 
*/ 
getNextNode : function (node) { 
return node ? node.nextSibling : null; 
}, 
/** 
* 返回节点的上一个节点，没有参数则返回根节点的第一个子节点 
* @param {Object} node 
* @return {Object} 节点的上一个节点 
*/ 
getPreviousNode : function (node) { 
return node ? node.previousSibling : null; 
}, 
/** 
* 返回节点的子节点，没有参数则返回null 
* @param {Object} node 
* @return {Object} 节点所有子节点 
*/ 
getChildNodes : function (node) { 
return (node && this.hasChildNodes(node)) ? node.childNodes : null; 
}, 
getChildNodeByTagName:function (node,tagname){
	var nodes = (node && tagname && this.hasChildNodes(node)) ? node.childNodes : null;
	if(nodes && nodes != null){
		for (var i = 0; i < nodes.length; i++){
			if(this.getTagName(nodes[i]) == tagname){
				return nodes[i];
			}
		}
	}else{
		return null;
	}
},
/** 
* 返回节点的父节点，没有参数则返回null 
* @param {Object} node 
* @return {Object} 节点父节点 
*/ 
getParentNode : function (node) { 
return node ? node.parentNode : null; 
}, 
/** 
* 根据节点名返回节点数组文本值，参数： 
* @param {string或object} nodeName：节点名称； 
* @return {object} 节点存在返回节点数组；节点不存在则返回null。 
*/ 
getNodesTextByName : function (nodeNames) { 
return nodeNames ? (this.dataType == 'json' ? this.getJsonNodesTextByName(nodeNames) : this.getArryNodesTextByName(nodeNames)) : null; 
}, 
/** 
* 根据节点名返回节点普通数组文本值，参数： 
* @param {string或object} nodeName：节点名称； 
* @return {object} 节点存在返回节点普通数组。 
*/ 
getArryNodesTextByName : function (nodeNames) { 
var rs = []; 
//返回普通数组格式 
switch (typeof(nodeNames)) { 
case 'string': 
var nodes = this.getNodesByTagName(nodeNames); 
for (var i = 0; i < nodes.length; i++) { 
rs.push(nodes[i].text); 
} 
break; 
case 'object': 
var subRs; 
var nodes; 
for (var i = 0; i < nodeNames.length; i++) { 
nodes = this.getNodesByTagName(nodeNames[i]); 
subRs = []; 
for (var j = 0; j < nodes.length; j++) { 
subRs.push(nodes[j].text); 
} 
rs.push(subRs); 
} 
break; 
} 
return rs; 
}, 
/** 
* 根据节点名返回节点JSON数组文本值，参数： 
* @param {string或object} nodeName：节点名称； 
* @return {object} 节点存在返回节点JSON数组；节点不存在则返回null。 
*/ 
getJsonNodesTextByName : function (nodeNames) { 
var rs = null; 
//返回JSON数组格式 
switch (typeof(nodeNames)) { 
case 'string': 
eval('rs = {' + nodeNames + ':[]}'); 
var nodes = this.getNodesByTagName(nodeNames); 
for (var i = 0; i < nodes.length; i++) { 
eval('rs.' + nodeNames + '.push({' + nodeNames + i + ': nodes[i].text})'); 
} 
break; 
case 'object': 
rs = {}; 
var nodes; 
for (var i = 0; i < nodeNames.length; i++) { 
eval('rs.' + nodeNames[i] + '=[]'); 
nodes = this.getNodesByTagName(nodeNames[i]); 
for (var j = 0; j < nodes.length; j++) { 
eval('rs.' + nodeNames[i] + '.push({' + nodeNames[i] + j + ': nodes[j].text})'); 
} 
} 
break; 
} 
return rs; 
}, 
/** 
* 根据节点属性得到节点，参数： 
* @param {String} key：属性名，默认是id 
* @param {String} value：属性值 
* @return {String} 符合条件的节点数组。 
*/ 
getNodesByAttribute : function (key, value) { 
key = key ? key : 'id'; 
value = value ? value : ''; 
return id ? this.xmlDoc.getElementById(id) : null; 
}, 
/** 
* 判断节点有无此属性的节点，参数： 
* @param {object} node：父节点 
* @param {String} key：属性名
* @param {String} value：属性值 
* @return 有子节点则返回子节点，否则返回false  
*/ 
hasNodeByAttribute : function (node,key, value) { 
	var childNodes = this.getChildNodes(node);
	var flag = false;
	if(childNodes){
		for(var i=0;i<childNodes.length;i++){
			var childNode = childNodes[i];
			if(childNode && childNode.getAttribute(key) == value){				
				return childNode;
			}		
		}
	}
	return flag; 
}, 
/** 
* 根据节点名得到节点，参数： 
* @param {string} tagName：节点名称 
* @return {string} 指定节点名字的和位置的节点或节点数组。 
*/ 
getNodesByTagName : function (tagName) { 
return tagName ? this.xmlDoc.getElementsByTagName(tagName) : null; 
}, 
/** 
* 根据节点路径返回第index个节点，参数： 
* @param {string} xPath：节点路径 
* @param {number}index：要索引的位置，为空或0则返回所有查找到的节点。 
* @return {string} 指定节点名字的和位置的节点或节点数组。 
*/ 
getNodesByXpath : function (xPath, index) { 
if (!xPath) return null; 
var nodes = this.xmlDoc.selectNodes(xPath); 
var len = nodes.length; 
if(!index || index > len || index < 0) return nodes; 
for(var i=0; i<len; i++){ 
if(i == index - 1) return nodes[i]; 
} 
}, 
/** 
* 得到指定节点文本，参数： 
* @param {object} node：节点 
* @return {string} 节点文本，为空则返回null 
*/ 
getText : function (node) { 
return node ? node.text : null; 
}, 
/** 
* 得到指定节点内的文本，参数： 
* @param {object} node：节点 
* @return {string} 节点文本，为空则返回null 
*/ 
getInnerText:function (node) {
	var resultStr = "";
	if (node) { 
		var childNodes = node.childNodes; 
		for(var i = 0; i < childNodes.length; i++) { 
			var strtemp = this.toString(childNodes[i]);
			if(strtemp != '' && strtemp.indexOf("<") == -1 && strtemp.indexOf(">") == -1){
				resultStr = strtemp;
			}
		} 
	}
	return resultStr;
},
/** 
* 得到指定节点名称，参数： 
* @param {object} node：节点 
* @return {string} 节点名称，为空则返回null 
*/ 
getTagName : function (node) { 
return node ? node.nodeName : null; 
}, 
/** 
* 返回节点类型，参数： 
* @param {object} node：节点 
* @return {string} 节点类型，为空则返回null 
* 1-element 
* 2-attribute 
* 3-text 
* 4-cdata 
* 5-entity reference 
* 6-entity 
* 7-pi (processing instruction) 
* 8-comment 
* 9-document 
* 10-document type 
* 11-document fragment 
* 12-notation 
*/ 
getNodeType : function (node) { 
return node ? node.nodeType : null; 
}, 
/** 
* 创建节点，参数： 
* @param {string} nodeName：节点名称，必填 
* @param {string} text：节点文本，可为空 
* @param {Object} attributes：属性值-JSON数组，可为空，例：{id:'id001',name:'name001'} 
* @param {Object} node：要增加子节点的节点，为空则返回新建的节点 
* @param {Boolean} cdata：是否生成带有CDATA区段的节点，true：生成，false：不生成 
* @return {Object} 创建的节点，有异常则返回null 
*/ 
createNode: function(nodeName, text, attributes, node, cdata) { 
if (this.isIE) { 
//创建子接点 
var childNode = this.xmlDoc.createElement(nodeName); 
//创建文本节点 
var textNode = cdata == true ? this.xmlDoc.createCDATASection(text) : this.xmlDoc.createTextNode(text); 
childNode.appendChild(textNode); 
//添加属性 
for (var i in attributes) { 
this.createAttribute(childNode,i,attributes[i]); 
}; 
return node ? node.appendChild(childNode) : childNode; 
} else { 
alert('FF创建节点再说.'); 
return null; 
} 
}, 
/** 
* 创建带CDATA区段的节点，参数： 
* @param {string} nodeName：节点名称，必填 
* @param {string} text：节点文本，可为空 
* @param {Object} attributes：属性值-JSON数组，可为空，例：{id:'id001',name:'name001'} 
* @param {Object} node：要增加子节点的节点，为空则返回新建的节点 
*/ 
createCDATANode: function(nodeName, text, attributes, node) { 
this.createNode(nodeName, text, attributes, node, true); 
}, 
copyNode:function (node){
	var xmlUtilsTemp = new XmlUtils({dataType:'json'}); 
	xmlUtilsTemp.loadXmlString(this.toString(node));
	return xmlUtilsTemp.getRoot(); 
},
/** 
* 创建节点属性，参数： 
* @param {Object} node：节点，必填 
* @param {String} key：属性名，必填 
* @param {Object} value：属性值，必填 
* @param {Object} node：返回新增属性的节点 
* @return {Object} 增加属性的节点，有异常则返回null 
*/ 
createAttribute: function(node, key, value) { 
if (this.isIE) { 
if(!key) return; 
var attr = this.xmlDoc.createAttribute(key); 
attr.value = value ? value : ""; 
node.setAttributeNode(attr); 
return node; 
} else { 
alert('FF创建节点再说.'); 
return node; 
} 
return null; 
}, 
/** 
* 把节点加到根节点上，参数： 
* @param {Object} node：节点 
* @return {Object} 有异常则返回null 
*/ 
addNodeToRoot: function(node) { 
if(!node) return null; 
this.getRoot().appendChild(node); 
return node; 
}, 
/** 
* 把节点加到另外节点上，参数： 
* @param {Object} node：节点 
*/ 
addNode: function(node,childNode) { 
return (node && childNode) ? node.appendChild(childNode) : false; 
}, 
/** 
* 从父节点移除节点自身，参数： 
* @param {Object} newNode：要替换的节点 
* @param {Object} oldNode：要被替换的节点 
*/ 
replaceChild: function(newNode, oldNode) { 
var parentNode = oldNode.parentNode; 
if(!newNode || !oldNode || !parentNode) return; 
parentNode.replaceChild(newNode, oldNode); 
}, 
/** 
* 从父节点移除节点自身，参数： 
* @param {Object} node：要移除的节点 
*/ 
removeChild: function(node) { 
if(!node || !node.parentNode) return; 
node.parentNode.removeChild(node); 
}, 
/** 
* 移除节点的所有子节点，参数： 
* @param {Object} node：父节点 
*/ 
removeChildNodes: function(node) { 
if (node && this.hasChildNodes(node)) { 
var childNodes = node.childNodes; 
//for(var i = 0; i < childNodes.length; i++) {//删除不了全部 
for(var i = 0; i < childNodes.length;) {
node.removeChild(childNodes[0]); 
} 
} 
}, 
/** 
* 设置节点属性值，不存在则新建，参数： 
* @param {Object} node：要设置的节点 
* @param {String} key：要设置的属性名 
* @param {String} value：要设置的属性值 
*/ 
setAttribute: function(node, key, value) { 
this.createAttribute(node, key, value); 
}, 
/** 
* 设置文本节点的文本，参数： 
* @param {Object} node：要设置的节点 
* @param {String} text：要设置的文本 
*/ 
setText: function(node, text) { 
if(this.isTextNode(node)) node.text = text; 
}, 
/** 
* 在文本节点后面追加文本，参数： 
* @param {Object} node：要设置的节点 
* @param {String} text：要设置的文本 
*/ 
appendText: function(node, text) { 
if(this.isTextNode(node)) node.appendData(text); 
}, 

/** 
* 输出xml,为空则输出根节点文本，参数： 
* @param {Object} node：要输出的节点 
*/ 
toString: function(node) { 
node = node ? node : this.xmlDoc.documentElement; 
if (typeof node == 'string') return node; 
return this.isIE ? node.xml : new XMLSerializer().serializeToString(node); 
} 
} 
