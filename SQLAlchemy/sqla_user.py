from typing import List
from typing import Optional
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session, DeclarativeBase
from sqlalchemy import create_engine, text, MetaData, Table, Column, Integer, String, ForeignKey, insert, select, update, delete

engine=create_engine("sqlite+pysqlite:///:memory:", echo=True)

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user_account"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]]
    addresses: Mapped[List["Address"]] = relationship(back_populates="user")
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(Base):
    __tablename__ = "address"
    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("user_account.id"))
    user: Mapped[User] = relationship(back_populates="addresses")
    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"

#table_objects = [Base.metadata.tables["user_account","address"]]
#Base.metadata.create_all(engine, tables=table_objects)

User.metadata.create_all(engine)
Address.metadata.create_all(engine)

sponge = User(name="spongebob", fullname="spongebob squarepants")
patrick = User(name="patrick", fullname="patrick star")
sponge_adress = Address(email_address='sb@gmail.com',user_id=1, user=sponge)
patrick_adress = Address(email_address='ps@gmail.com',user_id=2, user=patrick)

u1=User(name="pkrabs", fullname="Pearl Krabs")
a1 = Address(email_address="pearl.krabs@gmail.com")
u1.addresses.append(a1)
a2 = Address(email_address="pearl@aol.com", user=u1)

session = Session(engine)
session.add(sponge)
session.add(patrick)
session.add(u1)
some_star = session.get(User,2)
some_sponge = session.execute(select(User).filter_by(name="spongebob")).scalar_one()
session.flush()

print(select(Address.email_address).select_from(User).join(User.addresses))