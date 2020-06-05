import { shallowMount } from '@vue/test-utils';
import MainPage from '@/components/MainPage.vue';
import SortingComponent from '@/components/SortingComponent.vue';

describe('MainPage.vue', () => {
    it('Call sorting', () => {
        const wrapper = shallowMount(MainPage);
        wrapper.find(SortingComponent).vm.$emit('sorting');
        expect(MainPage.methods.sortByName()).toBeCalled()
    });
});