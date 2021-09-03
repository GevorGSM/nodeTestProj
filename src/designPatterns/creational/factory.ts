
class SimpleMembership {
  constructor(public name: string, public cost: number = 50) {}
}

class StandardMembership {
  constructor(public name: string, public cost: number = 100) {}
}

class PremiumMembership {
  constructor(public name: string, public cost: number = 150) {}
}

class MemberFactory {
  static list = {
    simple: SimpleMembership,
    standard: StandardMembership,
    premium: PremiumMembership
  };

  create(name, type = 'simple') {
    const Membership = MemberFactory.list[type] || MemberFactory.list.simple
    const member = new Membership(name);
    member.type = type;
    member.define = function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`)
    };
    return member;
  }
}

const factory = new MemberFactory();

const members = [
  factory.create('Vladilen', 'simple'),
  factory.create('Elena', 'premium'),
  factory.create('Vasilisa', 'standard'),
  factory.create('Ivan', 'premium'),
  factory.create('Petr')
];

members.forEach(m => {
  m.define()
});

// 2
class Bmw {
  constructor(public model, public price, public maxSpeed) {}
}

class BmwFactory {
  create(type) {
    if (type === 'X5')
      return new Bmw(type, 108000, 300);
    if (type === 'X6')
      return new Bmw(type, 111000, 320);
  }
}
