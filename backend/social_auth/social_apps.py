class Providers():
    site = "http://localhost:8000"

    def get_secret(provider):
        return {
            'facebook': 'b1a83c44f2300c3abef3f2a503e1dedd',
        }.get(provider, 'secret')

    def get_client_id(provider):
        return {
            'facebook': '193434881281521',
        }.get(provider, 'client_id')