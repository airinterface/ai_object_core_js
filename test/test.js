( function(){

  function testAll(){
    QUnit.test("AObject", function(assert){
      assert.ok( ( typeof com.ai.AObject != 'undefined' ) , 'AObject is defined' );
    });
  };
  testAll();
}).call(this);