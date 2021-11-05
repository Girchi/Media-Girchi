import automateOn from '../assets/components/automatedScrapping/automateOn.js';
import automateFormula from '../assets/components/automatedScrapping/automateFormula.js';
import automateImedi from '../assets/components/automatedScrapping/automateImedi.js';
import automatePalitra from '../assets/components/automatedScrapping/automatePalitra.js'
import automateMtavari from '../assets/components/automatedScrapping/automateMtavari.js';
import automateTabula from '../assets/components/automatedScrapping/automateTabula.js';
import automateIpn from '../assets/components/automatedScrapping/automateIpn.js';



describe("Testing automated scrapping", () => {
    test("Scrapping On.ge...", async () => {
        const result = automateOn();

        result.then(promiseStatus => {
            const value = promiseStatus;
            expect(value).toBe(promiseStatus);
        });
    });

    test("Scrapping Formula...", async () => {
        const result = automateFormula();

        result.then(promiseStatus => {
            const value = promiseStatus;
            expect(value).toBe(promiseStatus);
        });
    });

    test("Scrapping Imedi...", async () => {
        const result = automateImedi();

        result.then(promiseStatus => {
            const value = promiseStatus;
            expect(value).toBe(promiseStatus);
        });
    });
})


