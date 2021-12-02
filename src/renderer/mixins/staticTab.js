/*
|--------------------------------------------------------------------------
| Mixin
|--------------------------------------------------------------------------
|
| Common tabs functions that we use in different components throughout the application.
|
*/

export const staticTab = {

    methods: {

        // Send the tab data to the server with the tab name
        sendToServer(eventName, data) {

            console.log(eventName, data);

            this.$API.send("tabData", {
                pageURL: this.$route.path,
                pageTitle: this.$route.name,
                eventName: eventName,
                payload: data
            });
        },

        // Send the tab data to the server with the tab name
        sendAllToServer() {

            console.log(this.formData);

            this.$API.send("tabData", {
                pageURL: this.$route.path,
                pageTitle: this.$route.name,
                eventName: null,
                payload: this.formData
            });
        },

        // Stringy a given number
        stringifyNumber(index) {

            const special = [
                "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth",
                "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth"
            ];

            return special[index];
        }
    }
}
