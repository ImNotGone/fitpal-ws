import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify,{
    iconfont: 'md',
    theme:{//You can use it with class="class"
        primary: '#FF8754', //Primary 500 Orange
        secondary: '#353535', //Primary 0 Black
        accent: '#848484', //Secondary 400 Grey this is for background
        info: '#FFFFFF', //Secondary 100 White this is for text
    }
});

export default new Vuetify({
    iconfont: 'md',
    theme:{//You can use it with class="class"
        primary: '#FF8754', //Primary 500 Orange
        secondary: '#353535', //Primary 0 Black
        accent: '#848484', //Secondary 400 Grey this is for background
        info: '#FFFFFF', //Secondary 100 White this is for text
    }
});


