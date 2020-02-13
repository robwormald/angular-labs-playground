import {ɵrenderComponent as renderComponent} from '@angular/core';
import {SearchApp} from './app'

declare var scheduler;

renderComponent(SearchApp, {
	scheduler: (fn) => scheduler.postTask(fn)
});

