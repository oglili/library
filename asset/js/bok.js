const spinner = document.getElementById("spinner");
function getBook() {
    var output = document.getElementById('output');
    output.innerHTML = '';
    spinner.removeAttribute('hidden');
    
    fetch("http://openlibrary.org/search.json?q="+document.getElementById('input').value) 
    .then(response => response.json())
    .then(data => {
        spinner.setAttribute('hidden', '');
        console.log(data);
        
        data.docs.map(book => {

            let tilt = document.createElement('h3');
            tilt.innerHTML = book.title;
            
            let a = document.createElement('a');
            a.setAttribute('href', 'https://openlibrary.org'+book.key);
            a.setAttribute('target', '_blank');
            let img = document.createElement('img');
            img.setAttribute('src', 'http://covers.openlibrary.org/b/isbn/'+book.isbn[0]+'-M.jpg');
            img.setAttribute('alt', 'Image Not Available');
            img.setAttribute('title', 'Click to Read or Borrow');
            a.appendChild(img);

            let auth = document.createElement('p');
            auth.innerHTML = book.author_name.join(',  ');
            let b = document.createElement('a');
            b.setAttribute('href', 'https://openlibrary.org'+book.key);
            b.setAttribute('target', '_blank');
            auth.appendChild(b);

            let btn = document.createElement('button');
            btn.innerHTML = 'Info...';
            
            btn.addEventListener('click', function (event) {
                
                fetch('https://openlibrary.org'+book.key+'.json')
                .then(respons => respons.json())
                .then(dat => {
                
                    var desc = document.createElement('p');
                    desc.innerHTML = dat.description.value || dat.description;
                    desc.classList.add("back");
                    btn.after(desc);
                    
               }).catch((error) => {
                    let descp = document.createElement('p');
                    descp.innerHTML = 'no description... click on the image or above the title';
                    descp.classList.add("back");
                    btn.after(descp);
                    
                })

                var btnLess = document.createElement('button');
                btnLess.innerHTML = 'less...';
                btn.after(btnLess);

                btn.hidden = !btn.hidden;

                btnLess.addEventListener('click', function (event) {
                    btnLess.previousElementSibling.hidden = !btnLess.previousElementSibling.hidden;
                    btnLess.hidden = !btnLess.hidden;
                    btn.hidden = !btn.hidden;
                    
                })    
                  
           
            })
            
            output.appendChild(tilt);
            output.appendChild(a);
            output.appendChild(auth);
            output.appendChild(btn);
        
        })
                
    }).catch((error) => {
        console.log(error);
        
    })
   
}



        


