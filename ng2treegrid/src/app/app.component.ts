import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  key: number = 0;

  subinititives = [];
  milestonesRows = [];
  subinititivesRows = [];
  all = [];

  /**
   *
   */
  constructor() {

    for (var i = 0; i < 3; i++) {
      var subRoot = new subinitiative;
      this.key += 1;

      subRoot.row.key = this.key;
      subRoot.row.root = true;
      subRoot.name = subRoot.name + this.key

      this.subinititives.push(subRoot);

    }
    this.mapToArray(this.subinititives);

    console.log(this.subinititives, this.all);
  }

  public toggleMe(subFromKey): any {

    var sub: subinitiative = new subinitiative;
    sub = this.findNodeByKey(this.subinititives, subFromKey);

    if (sub.row.treeLoaded) {
      this.all = [];
      this.collaps(sub, sub.row.collapsed);
      sub.row.collapsed = !sub.row.collapsed;
      this.mapToArray(this.subinititives);

    }

    else {
      this.getMoreData(sub);
      sub.row.treeLoaded = !sub.row.treeLoaded
      console.log('colapseddd', this.subinititives)
    }

  }

  public getMoreData(sub) {
    try {
      this.key += 1;
      var level = sub.row.level + 1;
      var subrow = new subinitiative;
      subrow.name = "sub - subinititives" + this.key;
      subrow.row.key = this.key;
      subrow.row.level = level;
      sub.subinititives.push(subrow)

      for (var i = 0; i < 3; i++) {
        var mile = new milestone;
        this.key += 1;
        mile.row.key = this.key;
        mile.name = mile.name + this.key
        mile.row.level = level;
        sub.milestones.push(mile);

      }

      this.all = [];

      this.mapToArray(this.subinititives);

    }
    catch (c) {
      console.log('error')

    }
  }

  public findNodeByKey(subinititives: subinitiative[], key) {
    try {
      if (subinititives && subinititives.length > 0) {
        for (var i = 0; i < subinititives.length; i++) {
          var sub;
          if (subinititives[i] && subinititives[i].row.key == key) {
            sub = subinititives[i];
            return sub
          }
          sub = this.findNodeByKey(subinititives[i].subinititives, key);
          if (sub)
            return sub;
        }

      }
    }
    catch (x) {
      console.log('error', subinititives)
    }
  }

  public mapToArray(subinititives: subinitiative[]) {
    try {
      if (subinititives && subinititives.length > 0) {
        for (var i = 0; i < subinititives.length; i++) {

          var _display = new display;
          _display.name = subinititives[i].name;
          _display.key = subinititives[i].row.key;
          _display.rowVisibility = subinititives[i].row.dsiplayRow;
          _display.level = subinititives[i].row.level;

          this.all.push(_display)

          for (var j = 0; j < subinititives[i].milestones.length; j++) {
            var _display = new display;
            _display.name = subinititives[i].milestones[j].name;
            _display.key = subinititives[i].milestones[j].row.key;
            _display.arrowVisibility = subinititives[i].milestones[j].row.displayArrow;
            _display.rowVisibility = subinititives[i].milestones[j].row.dsiplayRow;
            _display.level = subinititives[i].milestones[j].row.level;
            this.all.push(_display)
          }





          this.mapToArray(subinititives[i].subinititives);
        }
      }
      else {
        return;
      }



    }

    catch (x) {
      console.log('error', subinititives)
    }
  }

  public collaps(sub, collapsed) {
    try {
      console.log('collapsed', sub, collapsed)

      if (sub) {
        if (sub.milestones.length > 0) {
          for (var j = 0; j < sub.milestones.length; j++) {
            if (collapsed)
              sub.milestones[j].row.dsiplayRow = "table-row";
            else
              sub.milestones[j].row.dsiplayRow = "none";
          }
        }
        for (var i = 0; i < sub.subinititives.length; i++) {
          if (collapsed) {
            sub.subinititives[i].row.dsiplayRow = "table-row"
          }
          else {
            sub.subinititives[i].row.dsiplayRow = "none"
          }


          if (!collapsed)
            this.collaps(sub.subinititives[i], collapsed);
          else
            sub.subinititives[i].row.collapsed = true;
        }
      }
      else {
        return;
      }
    }

    catch (x) {
      console.log('error', sub)
    }
  }


}

export class display {
  name: string = "";
  key: number;
  level: number;
  arrowVisibility: string = "visible";
  rowVisibility: string = "table-row"


}

export class subinitiative {
  name: string = "subinititive";
  row: Row = new Row;

  subinititives: subinitiative[] = [];
  milestones: milestone[] = [];

}

export class milestone {
  name: string = "milestone";
  row: Row = new Row;
  /**
   *
   */
  constructor() {
    this.row.displayArrow = "hidden"

  }
}


export class Row {

  displayArrow: string = "visible";
  dsiplayRow: string = "table-row";
  level: number = 0;
  key: number = 0;
  treeLoaded: boolean = false;
  collapsed: boolean = false;
  root: boolean = false;
}
