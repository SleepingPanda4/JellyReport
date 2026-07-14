import requests


class JellyfinClient:

    def __init__(self, url: str, api_key: str):

        self.url = url.rstrip("/")

        self.api_key = api_key


    def server_info(self):

        response = requests.get(

            f"{self.url}/System/Info",

            headers={
                "X-Emby-Token": self.api_key
            },

            timeout=10
        )

        response.raise_for_status()

        return response.json()
