var ThisID
var ThisPKG

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  // var rg = window.location.search.substr(1)
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}

function loadPackage() {
  var id = getUrlParam('id')
  ThisID = id
  $.ajax(`/api/packages/${id}`, {
    method: 'GET',
    success: function(package) {
      appendPackage(package)
    }
  })
}

function appendPackage(Package) {
  return $('#PackageHeader').append(appendDetail(Package))
}

function appendDetail(Package) {
  ThisPKG = Package
  return $(`<div>
    <text>Package ID: ${Package.PKG_PKG_ID}</text> 
    </p>
    <text>Package Name:</text>
    <input type="text" id="PkgnameInput" value = ${Package.TXT_PKG_NAME}>
    <button onclick="renamePackage()">Rename PKG</button> 
    </p>
    <text>Created at: ${Package.PKG_CREATED_AT}</text>   
    </p>
    <text id="Last">Last changed at: ${Package.PKG_CHANGED_AT}</text>       
    </div>`)
}

function renamePackage() {
  var name = $('#PkgnameInput').val()
  $.ajax(`/api/packages/${ThisID}/${name}`, {
    method: 'PUT',
    success: function() {
      alert('succeed!')
      resetLastChange()
    },
    error: function() {
      alert('Failed!')
    }
  })
}
function resetLastChange() {
  // return ThisPKG.PKG_CHANGED_AT = new Date().toTimeString()
  var ts = new Date().toLocaleString()
  console.log(ts)
  $('#Last')[0].innerHTML = 'Last changed at: ' + ts
}
loadPackage()
