import { TestBed } from '@angular/core/testing';

import { SelectLessonService } from './select-lesson.service';

describe('SelectLessonService', () => {
  let service: SelectLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
