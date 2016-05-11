angular.module('Mahjong.services', []).factory('Settings',
    function() {
        var settings = {};

        settings.apiUrl = 'http://mahjongmayhem.herokuapp.com/';
        settings.apiCallbackUrl = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/dist/#/authcallback';
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