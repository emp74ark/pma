"use strict";(self.webpackChunkpma=self.webpackChunkpma||[]).push([[754],{6754:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var i=n(2791),a=n(9140),l=n(6144),r=n(3360),o=n(9434),s=n(9508),c=n(1413),d=n(2469),u=n(1134),m=n(5668),x=n(3168),f=n(184),h=function(){var e,t=(0,o.v9)((function(e){return e.modal})).data,n=t,i=n.id,a=n.title,l=n.order,h=(0,x.$)().t,v=(0,u.cI)({mode:"all"}),g=v.register,p=v.handleSubmit,j=v.formState,b=j.errors,k=j.isValid,N=(0,o.I0)();return(0,f.jsx)("div",{className:"col",children:(0,f.jsxs)("form",{className:"d-flex align-items-center gap-1",onSubmit:p((function(e){var n=(0,c.Z)((0,c.Z)({},t),{},{title:e.title,order:l});i&&(0,m.L9)(n).then((function(){N((0,s.nC)())}))})),children:[(0,f.jsx)("div",{className:"form-group",children:(0,f.jsx)("input",(0,c.Z)((0,c.Z)({className:"form-control"},g("title",{required:!0})),{},{type:"text",name:"title",id:"title",defaultValue:a}))}),"required"===(null===(e=b.title)||void 0===e?void 0:e.type)&&(0,f.jsx)(d.Z,{variant:"warning",children:h("editColumn.titleRequired")}),(0,f.jsx)(r.Z,{size:"sm",type:"submit",variant:"success",className:"bi-check-lg text-light",disabled:!k}),(0,f.jsx)(r.Z,{size:"sm",variant:"warning",className:"bi-x-lg text-light",onClick:function(){return N((0,s.Mr)("editColumn"))}})]})})},v=[{name:"addTask",icon:"bi-plus-circle",color:"text-primary"},{name:"remove",icon:"bi-trash",color:"text-danger"}],g=(0,i.lazy)((function(){return n.e(828).then(n.bind(n,4828))})),p=function(e){var t=(0,o.I0)(),n=(0,o.v9)((function(e){return e})),i=n.modal,c=i.visible,d=i.data,u=n.setting,m=u.theme,x=u.maxHeight,p=function(e,n,i){e.stopPropagation();var a="addTask"===n?{boardId:i.boardId,columnId:i.id,title:""}:i;t((0,s.h7)({name:n,data:a}))};return(0,f.jsxs)(a.Z,{className:"column-card flex-grow-0 flex-shrink-0 shadow-sm",bg:m,text:"dark"===m?"white":"dark",children:[(0,f.jsx)(a.Z.Header,{className:"gap-3",children:(0,f.jsxs)("div",{className:"row",children:[c.editColumn&&(null===d||void 0===d?void 0:d.id)===e.column.id?(0,f.jsx)(h,{}):(0,f.jsx)(a.Z.Title,{onClick:function(t){return p(t,"editColumn",e.column)},className:"col",children:e.column.title}),(0,f.jsx)(l.Z,{className:"col-4 float-right",size:"sm",children:v.map((function(t){var n=t.name,i=t.icon,a=t.color;return(0,f.jsx)(r.Z,{className:"".concat(i," ").concat(a),variant:"link",onClick:function(t){return p(t,n,e.column)}},n)}))})]})}),(0,f.jsx)(a.Z.Body,{style:{maxHeight:"".concat(x-100,"px")},className:"d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto",children:(0,f.jsx)(g,{data:e})})]})}}}]);
//# sourceMappingURL=754.c6d06c1e.chunk.js.map