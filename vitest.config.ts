import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'happy-dom',
        globals: true,
        include: [
            '{stores,components}/**/*.{test,spec}.{ts,js}',
            'composables/*.{test,spec}.{ts,js}',
        ]
    }
})