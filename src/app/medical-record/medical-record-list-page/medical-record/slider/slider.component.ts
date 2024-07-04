import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

interface Topic {
  title: string;
  content: TemplateRef<any>;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() topics: Topic[] = [];
  selectedTopicIndex = 0;

  selectTopic(index: number) {
    this.selectedTopicIndex = index;
  }
}
