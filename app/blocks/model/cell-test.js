import Cell from './cell';
describe('Cell', function() {
	it('test function isAlive', function() {
		let cell1 = new Cell(1, 1, 0);
		let cell2 = new Cell(1, 1, 1);
		expect(cell1.isAlive()).toEqual(false);
		expect(cell2.isAlive()).toEqual(true);
	});
});