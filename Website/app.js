Dropzone.autoDiscover = false;
pred = document.querySelector('.pred')


function init() {
    
    
    let dz = new Dropzone("#dropzone", {
        url: "/",
        uploadMultiple:false,
        maxFiles: 1,
        addRemoveLinks: true,
        //dictDefaultMessage:'<span class="span"><h4 class="uploadBTN">Upload</h4></span>' ,
        autoProcessQueue: false,
        //change the previewTemplate to use Bootstrap progress bars
        previewTemplate:'<div class="dz-preview dz-file-preview"> <div class="dz-details"> <div class="dz-filename"><span data-dz-name></span></div> <div class="dz-size" data-dz-size></div> </div> </div>'
    });

    dz.on('addedfile',function(){
        if(dz.files[1]!=null){
            dz.removeFile(dz.files[0])
        }
    });
    dz.on('complete',function(file){
        let imageData = file.dataURL;

        var url = 'http://127.0.0.1:5000/classify_cat';

        $.post(url, {
            image_data: imageData
        },function(data,status){
            pred.innerHTML = data;
        });
    });
    $('#submitBtn').on('click',function(e){
        dz.processQueue()
    });
}
init()
