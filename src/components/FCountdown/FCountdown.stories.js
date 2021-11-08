import FCountdown from '@/components/FCountdown/FCountdown.vue';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default {
    title: 'FCountdown',
    components: FCountdown,
};

export const Default = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-countdown :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const Show = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-countdown :date="date" />
            <h3><code>dh</code></h3>
            <f-countdown show="dh" :date="date" />
            <h3><code>hms</code></h3>
            <f-countdown show="hms" :date="date" />
            <h3><code>ms</code></h3>
            <f-countdown show="ms" :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const WithLabels = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-countdown with-labels :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const UseTwoDigitNumbers = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-countdown use-two-digit-numbers with-labels :date="date" />
        </div>
    `,
    data() {
        return {
            date: Date.now() + 2 * DAY + 3 * HOUR + 30 * MINUTE + 5 * SECOND,
        };
    },
});

export const CssClasses = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-countdown :css-classes="cssClasses" :date="date" />
        </div>
    `,
    data() {
        return {
            cssClasses: [
                {
                    time: MINUTE,
                    cssClass: 'co-red-4',
                },
            ],
            date: Date.now() + MINUTE + 5 * SECOND,
        };
    },
});

export const TimeOutEvent = () => ({
    components: { FCountdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <f-countdown :date="date" @time-up="onTimeup" />
            <span>{{ msg }}</span>
        </div>
    `,
    data() {
        return {
            msg: '',
            date: Date.now() + 5 * SECOND,
        };
    },
    methods: {
        onTimeup() {
            this.msg = 'Time is up';
        },
    },
});
