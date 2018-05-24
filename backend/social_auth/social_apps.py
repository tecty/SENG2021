class Providers():
    site = "http://localhost:8000"

    def get_secret(provider):
        return {
            'facebook': 'b1a83c44f2300c3abef3f2a503e1dedd',
            'google' : '28DpjNylDbpk_r46lEKo7RSG',
        }.get(provider, 'secret') 

    def get_client_id(provider):
        return {
            'facebook': '193434881281521',
            'google' : '947251242990-kr646kalisteh6nemk7ev7fds84ulmv4.apps.googleusercontent.com',
        }.get(provider, 'client_id')