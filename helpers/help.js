const hbs = require('hbs');
hbs.registerHelper('nose',(user)=>{
    if(user>=70&&user<80){
        return `<div class="card border-success">
        <div class="card-body text-success text-center">
            <h5 class="card-title">Promedio General</h5>
            <h3 class="card-title">${ user }</h3>
            <h5 class="card-title">10% de beca</h5>
        </div>
    </div>`
    }if(user>=80&&user<90){
        return `<div class="card border-success">
        <div class="card-body text-success text-center">
            <h5 class="card-title">Promedio General</h5>
            <h3 class="card-title">${ user }</h3>
            <h5 class="card-title">20% de beca</h5>
        </div>
    </div>`
        
    }if(user>=90&&user<100){
        return `<div class="card border-success">
        <div class="card-body text-success text-center">
            <h5 class="card-title">Promedio General</h5>
            <h3 class="card-title">${ user }</h3>
            <h5 class="card-title">30% de beca</h5>
        </div>
    </div>`
    }if(user==100){
        return `<div class="card border-success">
        <div class="card-body text-success text-center">
            <h5 class="card-title">Promedio General</h5>
            <h3 class="card-title">${ user }</h3>
            <h5 class="card-title">40% de beca</h5>
        </div>
    </div>`}
    else{
        return `<div class="card border-danger">
        <div class="card-body text-danger text-center">
            <h5 class="card-title">Promedio General</h5>
            <h3 class="card-title">${ user }</h3>
            <h5 class="card-title">Sin Beca</h5>
        </div>
    </div>`
    }
})