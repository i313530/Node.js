function loadPackages() {
  $.ajax('/api/packages', {
    success: function(packages) {
      packages.forEach(function(d) {
        appendPackage(d)
      })
    }
  })
}
function appendPackage(Package) {
  $('#PackageList').append(createPackageLi(Package))
}
function createPackageLi(Package) {
  return $(`<li id="${Package.PKG_ID}">
    <span>${Package.CREATED_AT}: ${Package.PKG_NAME}</span>
    <input value=${Package.PKG_NAME}}/>
    <span><button onclick="removePackage(${Package.PKG_ID})">Remove PKG</button></span>
   </li>`)
}
function addPackage() {
  var $Packageidinput = $('#PkgidInput')
  var $PkgnameInput = $('#PkgnameInput')
  $.ajax('/api/packages', {
    method: 'POST',
    data: {
      PKG_ID: $Packageidinput.val(),
      PKG_NAME: $PkgnameInput.val()
    },
    success: function(package) {
      appendPackage(package)
      $Packageidinput.val('')
      $PkgnameInput.val('')
    }
  })
}
function removePackage(id) {
  $.ajax(`/api/packages/${id}`, {
    method: 'DELETE',
    success: function(resp) {
      removePackageLi(id)
    }
  })
}

function removePackageLi(packageId) {
  $(`#${packageId}`).remove()
}

loadPackages()
