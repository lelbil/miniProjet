var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
var http = require('http');
var translate = require('yandex-translate-api')("trnsl.1.1.20170414T013931Z.b5d4a32700d2889c.bcffd691b336f2e0caf4c99ac4279cb1b44c23f1");
var server = http.Server(app);
server.listen(3001);
var io = require('socket.io')(server);

var routes = require('./routes/index');
var users = require('./routes/users');
var Verb = require('./model/model');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var fetch = function(socket, diff){
    console.log('difficuty is: ' + diff);
    /*Verb.findOne({difficulty: 1}, function(err, result){
        console.log('found one: ' + result);
    }).skip(15)*/
    Verb.count({difficulty:diff}, function(err, counter){
        if (err) throw err;
    
        var random = Math.floor(Math.random() * 500);
        //Verb.findOne(diff? {difficulty: diff} : {}).skip(random).exec(function(err, result){
        Verb.findOne({difficulty: diff}, function(err, result){ //why isn't this working
            if(err) throw err;
            //if no error, procceed to get translation
            var difficulty = result.difficulty;
            var verbe = result.verb;
            var trans; //I love naming variables
            translate.translate(verbe,{ from: 'fr', to: 'en'}, function(err, translated) {
                //console.log(translated.text[0])
                trans = translated.text[0]; 
                //console.log(trans); //other coe goes here
                console.log(verbe + " " + trans + " " + difficulty);
                socket.emit('gotVerb', {
                    verb: verbe,
                    translation: trans,
                    difficulty: difficulty
                });
            });  
        }).skip(random%counter);
    })
}

io.on('connection', function (socket) {
    /*console.log(socket);  
    console.log('connection connected');
    console.log('dir haja emitets')*/

    socket.on('verbRequested', function (data) {
        //use data to get a verb with specific deficulty
        fetch(socket, data.difficulty);
        });
});

app.use('/', routes);
app.use('/users', users);

/* code que j'ai utilisé pour peupler la base de données au début
var longestStringEver = "abaisser abandonner abasourdir abâtardir abattre abcéder abdiquer abécher aberrer abêtir abhorrer abîmer abjurer ablater ablatir abloquer abolir abomber abominer abonder abonner abonnir aborder aboucher abouler abouter aboutir aboyer abraquer abraser abréger abreuver abricoter abriter abroger abrutir absorber absoudre abstraire abuser accabler accaparer accastiller accéder accélérer accentuer accepter accessoiriser accidenter acclamer acclimater accoler accommoder accompagner accomplir accorder accorer accoster accoter accoucher accouer accoupler accourcir accourir accoutrer accoutumer accréditer accrocher accroître accroire accueillir acculer acculturer accumuler accuser acenser acérer acétifier acétyler achalander achaler acharner acheminer acheter achever achopper achromatiser acidifier aciduler aciérer aciériser aciseler acmoder acquérir acquiescer acquitter acter actionner activer actualiser adapter additionner adhérer adjectiver adjectiviser adjoindre adjuger adjurer admettre administrer admirer admonester adonner adopter adorer adosser adouber adoucir adresser adsorber aduler adultérer advenir adverbialiser aérer affabuler affadir affaiblir affaisser affaiter affaler affamer afféager affecter affectionner afférer affermer affermir afficher affiler affilier affiner affirmer affleurer affliger afflouer affluer affoler affouager affouiller affourager affourcher affourrager affranchir affréter affriander affricher affrioler affriter affronter affruiter affubler affurer affûter africaniser agacer agencer agglomérer agglutiner aggraver agioter agir agiter agneler agoincher agonir agoniser agrafer agrandir agréer agréger agrémenter agresser agricher agripper aguerrir aguicher ahaner ahurir aicher aider aigrir aiguiller aiguilleter aiguillonner aiguiser ailler aimanter aimer airer ajointer ajourer ajourner ajouter ajuster alambiquer alanguir alarmer alcaliniser alcaliser alcooliser alentir alerter aléser aleviner aliéner aligner alimenter aliter allaiter allécher alléger allégir allégoriser alléguer aller allier allonger allouer allumer alluvionner alourdir alpaguer alphabétiser altérer alterner aluminer aluner alunir amadouer amaigrir amalgamer amariner amarrer amasser amatir ambiancer ambitionner ambler ambrer améliorer aménager amender amener amenuiser américaniser amerrir ameublir ameuter amidonner amincir aminer amnistier amocher amodier amoindrir amollir amonceler amorcer amordancer amortir amourer amplifier amputer amurer amuser analgésier analyser anastomoser anathématiser anatomiser ancrer anéantir anémier anesthésier anglaiser angliciser angoisser anhéler animaliser animer aniser ankyloser anneler annexer annihiler annoncer annoter annualiser annuler anoblir anodiser anonner anordir antéposer anticiper antidater aoûter apaiser apanager apatamer apercevoir apeurer apiquer apitoyer aplanir aplatir aplomber apostasier aposter apostiller apostropher appairer apparaître appareiller apparenter apparier appartenir appâter appauvrir appeler appendre appertiser appesantir appéter applaudir appliquer appointer appointir apponter apporter apposer apprécier appréhender apprendre apprêter apprivoiser approcher approfondir approprier approuver approvisionner appuyer apurer aquiger arabiser araser arbitrer arborer arboriser arc bouter archaïser architecturer archiver arçonner ardoiser argenter argotiser argougner arguer argumenter ariser armer armorier arnaquer aromatiser arpéger arpenter arpigner arquebuser arquepincer arquer arracher arraisonner arranger arrenter arrérager arrêter arriérer arrimer arriser arriver arrondir arroser articuler artiller ascensionner aseptiser aspecter asperger asphalter asphyxier aspirer assabler assagir assaillir assainir assaisonner assarmenter assassiner assavoir assécher assembler assener asseoir assermenter asservir assibiler assiéger assigner assimiler assister associer assoiffer assoler assombrir assommer assoner assortir assoupir assouplir assourdir assouvir assujettir assumer assurer asticoter astiquer astreindre atermoyer atomiser atrophier attabler attacher attaquer attarder atteindre atteler attendre attendrir attenter atténuer atterrer atterrir attester attibuer attiédir attifer attiger attirer attiser attitrer attraper attribuer attriquer attrister attrouper auditer auditionner augmenter augurer auréoler aurifier ausculter authentifier authentiquer autodétruire autofinancer autographier automatiser autopsier autoriser autosuggestionne avachir avaler avaliser avancer avantager avarier aveindre avenir aventurer avertir aveugler aveulir avilir aviner aviser avitailler";
var veryLongArray = longestStringEver.split(" ");
veryLongArray.forEach(function (verbArg){
    var random = Math.floor((Math.random() * 100) + 1);
    random %= 3;
    var verbVar = new Verb({
        verb: verbArg,
        difficulty: random
    })

     verbVar.save(function (err){
        if(err) throw err;
        //console.log("verbe sauvegardé");
    })
});*/

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
