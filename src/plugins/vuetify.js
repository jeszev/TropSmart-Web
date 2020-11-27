import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);
export default new Vuetify({
    
    theme: {
        themes: {
          light: {

            //primary: colors.indigo.lighten1, // #E53935
            //secondary: colors.red.lighten4, // #FFCDD2
            //accent: colors.indigo.base, // #3F51B5
            primary: colors.indigo.darken3,
            secondary: colors.indigo.darken1,
            accent: colors.indigo.base,
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            skyblue: '#007BFF'
            
        },
        customProperties: true,
        iconfont: 'md',
        },
      },
      
});
