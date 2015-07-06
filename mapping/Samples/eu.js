jQuery(function($) {
  var constituencies = {
      "Dublin": {
        counties: ["Dublin"],
        meps: {
          "Lynn Boylan": {
            "name": "Lynn Boylan",
            "partyIrl": "Sinn Féin",
            "partyEU": "",
            "ttip": "Amendments",
            "phoneStras": "+333 88 1 75257",
            "email": "",
            "ttipPosition" : "",
            "constituency" : "Dublin"
          },
          "Nessa Childers ": {
            "name": "Nessa Childers",
            "partyIrl": "Independent",
            "partyEU": "",
            "ttip": "Unknown",
            "phoneStras": "+333 88 1 75180",
            "email": "",
            "ttipPosition" : "",
            "constituency" : "Dublin"
          },
          "Brian Hayes": {
            "name": "Brian Hayes",
            "partyIrl": "Fine Gael",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75275",
            "email": "",
            "ttipPosition" : "Unknown",
            "constituency" : "Dublin"
          }
        }
      },
      "South": {
        counties: ["Wicklow", "Carlow", "Kilkenny", "Wexford", "Clare", "Waterford", "Tipperary", "Limerick", "Cork", "Kerry"],
        meps: {
          "Brian Crowley": {
            "name": "Brian Crowley",
            "partyIrl": "Fianna Fáil",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75751",
            "email": "",
            "ttipPosition" : "Unknown",
            "constituency" : "South"
          },
          "Liadh Ní Riada": {
            "name": "Liadh Ní Riada",
            "partyIrl": "Sinn Féin",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75322",
            "email": "",
            "ttipPosition" : "Amendments	",
            "constituency" : "South"
          },
          "Sean Kelly": {
            "name": "Sean Kelly",
            "partyIrl": "Fine Gael	",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75206",
            "email": "",
            "ttipPosition" : "Pro TTIP ",
            "constituency" : "South"
          },
          "Deirdre Clune": {
            "name": "Deirdre Clune ",
            "partyIrl": "Fine Gael",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75292",
            "email": "",
            "ttipPosition" : "Unknown	",
            "constituency" : "South"
          }
        }

      },


      "Midlands - Northwest": {
        counties: ["Mayo", "Galway", "Sligo", "Leitrim", "Roscommon", "Donegal", "Monaghan", "Cavan", "Louth", "Meath", "Westmeath", "Kildare", "Offaly", "Laois", "Longford"],
        meps: {
          "Luke Ming Flanagan": {
            "name": "Luke Ming Flanagan",
            "partyIrl": "Independent",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75238 ",
            "email": "",
            "ttipPosition" : "Unknown",
            "constituency" : "Midlands - Northwest"
          },
          "Matt Carthy": {
            "name": "Matt Carthy",
            "partyIrl": "Sinn Féin",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75838",
            "email": "",
            "ttipPosition" : "Amendments",
            "constituency" : "Midlands - Northwest"
          },
          "Mairead McGuinness ": {
            "name": "Mairead McGuinness",
            "partyIrl": "Fine Gael",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75214",
            "email": "",
            "ttipPosition" : "Unknown",
            "constituency" : "Midlands - Northwest"
          },
          "Marian Harkin": {
            "name": "Marian Harkin",
            "partyIrl": "Independent",
            "partyEU": "",
            "ttip": "",
            "phoneStras": "+333 88 1 75797",
            "email": "",
            "ttipPosition" : "Unknown",
            "constituency" : "Midlands - Northwest"
          }
        }
      }
    },
    $svg =
    d3.select('#county_solids')
    .selectAll('g'),
    County = function(node) {
      var
        name = node.id
        .substring(0, 1).toUpperCase() + node.id.substring(1);
      this.name = name;
      this.constituency = (function(countyName) {
        var cons =
          "Unknown constituency";
        for (var constituency in constituencies) {
          if (constituencies[constituency].counties
            .lastIndexOf(countyName) >= 0)
            cons = constituency;
        }
        return cons;
      })(name);
      this.meps = (function(con){
        if (constituencies.hasOwnProperty(con)) return constituencies[con].meps;
        else return {};
      })(this.constituency);
    },
    counties = {};
  $svg.each(function() {
    var c = new County(this);
    counties[c.name] = c;
  });
  window.$svg = $svg;
  window.counties = counties;
});
