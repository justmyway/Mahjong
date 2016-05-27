angular.module('Mahjong.services', []).factory('Settings',
    function() {
        var settings = {};

        settings.apiUrl = 'http://mahjongmayhem.herokuapp.com/';
        settings.apiCallbackUrl = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://127.0.0.1:3000/#/authcallback';
        settings.gameTemplates = {
            'Dragon': 'Dragon',
            'Monkey': 'Monkey',
            'Ox': 'Ox',
            'Ram': 'Ram',
            'Rooster': 'Rooster',
            'Shanghai': 'Shanghai',
            'Snake': 'Snake'
        };

        return settings;
    }
);